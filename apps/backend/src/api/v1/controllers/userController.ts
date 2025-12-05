import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.clerkId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await userService.getUserByClerkId(req.clerkId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Surrogate-Control", "no-store");

        return res.status(200).json({ message: "User fetched", data: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUserByClerkId(req.clerkId!, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.deleteUserByClerkId(req.clerkId!);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};