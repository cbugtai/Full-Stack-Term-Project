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

export const findOrCreateUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const auth = getAuth(req);
        const clerkId = auth.userId;

        if (clerkId) {
            const clerkUser = await clerkClient.users.getUser(clerkId);

            let backendUser = await userService.getUserByClerkId(clerkId);

            if (!backendUser) {
                backendUser = await userService.createUser({
                    clerkId,
                    email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
                    userName: clerkUser.username ?? "",
                    firstName: clerkUser.firstName ?? "",
                    lastName: clerkUser.lastName ?? "",
                });
            }

            req.userId = backendUser.id;
            req.clerkId = clerkId;
        }

        next();
    } catch (error) {
        next(error);
    }
};