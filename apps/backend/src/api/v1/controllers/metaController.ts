import type { Request, Response, NextFunction } from "express";
import * as metaService from "../services/metaService";

export const getBrands = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = await metaService.getBrands();
        res.setHeader("Cache-Control", "no-store");
        res.json(brands);
    } catch (err) {
        next(err);
    }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await metaService.getCategories();
        res.setHeader("Cache-Control", "no-store");
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

export const getStatuses = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const statuses = await metaService.getStatuses();
        res.setHeader("Cache-Control", "no-store");
        res.json(statuses);
    } catch (err) {
        next(err);
    }
};

export const getConditions = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const conditions = await metaService.getConditions();
        res.setHeader("Cache-Control", "no-store");
        res.json(conditions);
    } catch (err) {
        next(err);
    }
};