import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByClerkId(req.clerkId!);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUser(req.userId!, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.deleteUser(req.userId!);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};