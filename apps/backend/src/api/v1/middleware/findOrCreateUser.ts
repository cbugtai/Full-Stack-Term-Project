import { User } from "@prisma/client";
import * as userService from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";

/**
 * If a sessionToken is included in Authorization header, get userId from Clerk
 *     If user does not exist, add user to back-end database
 *     Set req.userId to back-end user id (string)
 * otherwise set req.userId to null
 */
export const findOrCreateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // clerk getAuth method authenticates user against HTTP request Authorization heading
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    // store in simple userId table
    if (clerkUserId) {
      // get additional user info from Clerk
      const user = await clerkClient.users.getUser(clerkUserId!);

      let backendUser: User | null = await userService.getUserByClerkUserId(
        clerkUserId
      );
      if (!backendUser) {
        backendUser = await userService.createUser({
          clerkUserId,
          userName: user.username || "",
          email: user.emailAddresses[0]?.emailAddress || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
      }

      // set the database userId in request for downstream middleware/routes
      req.userId = backendUser.id.toString();
    } else {
      // if there is no clerkUserId, set req.userId to null
      req.userId = null;
    }

    next();
  } catch (error) {
    next(error);
  }
};
