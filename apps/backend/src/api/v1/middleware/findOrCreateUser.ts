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

export const findOrCreateUser = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const auth = getAuth(req);
        const clerkId = auth.userId;

        if (clerkId) {
            let backendUser = await userService.getUserByClerkId(clerkId);
            const clerkUser = await clerkClient.users.getUser(clerkId);

            if (!backendUser) {
                backendUser = await userService.createUser({
                    clerkId,
                    email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
                    userName: clerkUser.username ?? "",
                    firstName: clerkUser.firstName ?? "",
                    lastName: clerkUser.lastName ?? "",
                    profilePic: clerkUser.imageUrl ?? null,
                });
            } else if (backendUser.profilePic !== clerkUser.imageUrl) {
                    backendUser = await userService.updateUserByClerkId(clerkId, {
                    profilePic: clerkUser.imageUrl ?? null,
                });
            }

            req.userId = backendUser.id;
            req.clerkId = clerkId;
        }

        next();
    } catch (error) {
        console.error("findOrCreateUser error:", error);
        next(error);
    }
};