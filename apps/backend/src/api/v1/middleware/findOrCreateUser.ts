import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import * as userService from "../services/userService";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
            clerkId?: string;
        }
    }
}

const nullToUndefined = <T>(value: T | null | undefined): T | undefined =>
    value === null ? undefined : value;

export const findOrCreateUser = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);
        const clerkId = auth.userId;
        if (!clerkId) return next();

        const clerkUser = await clerkClient.users.getUser(clerkId);

        const firstName = nullToUndefined(clerkUser.firstName);
        const lastName = nullToUndefined(clerkUser.lastName);
        const userName = nullToUndefined(clerkUser.username);
        const email = clerkUser.emailAddresses[0]?.emailAddress ?? undefined;
        const profilePic = nullToUndefined(clerkUser.imageUrl);

        if (!email) {
            console.error(`Clerk user ${clerkId} has no email!`);
            return next();
        }

        let backendUser = await userService.getUserByClerkId(clerkId);

        if (!backendUser) {
            backendUser = await userService.createUser({
                clerkId,
                email,
                firstName,
                lastName,
                userName,
                profilePic,
            });
        } else {
            const updates: Partial<typeof backendUser> = {};
            if (email) updates.email = email;
            if (firstName) updates.firstName = firstName;
            if (lastName) updates.lastName = lastName;
            if (userName) updates.userName = userName;
            if (profilePic) updates.profilePic = profilePic;

            if (Object.keys(updates).length > 0) {
                backendUser = await userService.updateUserByClerkId(clerkId, updates);
            }
        }

        req.userId = backendUser.id;
        req.clerkId = clerkId;

        next();
    } catch (error) {
        console.error("findOrCreateUser error:", error);
        next(error);
    }
};