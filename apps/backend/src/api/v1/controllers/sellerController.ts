import { Request, Response, NextFunction } from "express";
import { SellerDto } from "../../../../../../shared/types/seller-terms";
import * as sellerService from "../services/sellerService";
import { successResponse } from "../models/responseModel";

type AuthRequest = Request & {
    userId?: number;
}

// helper fucntion to read userId from requests
function getUserId(req: Request): number {
    const userId = (req as AuthRequest).userId;

    if (!userId) {
        throw new Error("User not authenticated")
    }
    return userId
}

export const getAllSellers = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as AuthRequest).userId;

        const sellers: SellerDto[] = await sellerService.fetchAllSellers(userId)
        
        res.status(200).json(
            successResponse(sellers, `Sellers retrieved successfully`)
        )

    } catch (error) {
        next(error)
    }
}

export const getSellerById = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as AuthRequest).userId;
        const sellerId = Number(req.params.id)

        if (Number.isNaN(sellerId)) {
            throw new Error("Invalid sellerId parameter")
        }

        const seller: SellerDto = await sellerService.fetchSellerById(userId, sellerId)
        
        res.status(200).json(
            successResponse(seller, `Seller ${sellerId} retrieved successfully`)
        )
        
    } catch (error) {
        next(error)
    }
}

export const addFavoriteSeller = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = getUserId(req);
        const sellerId = Number(req.query.sellerId)

        if (Number.isNaN(sellerId)) {
            throw new Error("Invalid sellerId parameter")
        }

        const seller: SellerDto = await sellerService.addFavoriteSeller(userId, sellerId)
        
        res.status(200).json(
            successResponse(seller, `Seller ${sellerId} marked as favorite`)
        )
        
    } catch (error) {
        next(error)
    }
}

export const removeFavoriteSeller = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = getUserId(req);
        const sellerId = Number(req.query.sellerId)

        if (Number.isNaN(sellerId)) {
            throw new Error("Invalid sellerId parameter")
        }

        const seller: SellerDto = await sellerService.removeFavoriteSeller(userId, sellerId)
        
        res.status(200).json(
            successResponse(seller, `Seller ${sellerId} removed from favorites`)
        )
        
    } catch (error) {
        next(error)
    }
}

export const addBlockedSeller = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = getUserId(req);
        const sellerId = Number(req.query.sellerId)

        if (Number.isNaN(sellerId)) {
            throw new Error("Invalid sellerId parameter")
        }

        const seller: SellerDto = await sellerService.addBlockedSeller(userId, sellerId)
        
        res.status(200).json(
            successResponse(seller, `Seller ${sellerId} has been blocked`)
        )
        
    } catch (error) {
        next(error)
    }
}

export const removeBlockedSeller = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = getUserId(req);
        const sellerId = Number(req.query.sellerId)

        if (Number.isNaN(sellerId)) {
            throw new Error("Invalid sellerId parameter")
        }

        const seller: SellerDto = await sellerService.removeBlockedSeller(userId, sellerId)
        
        res.status(200).json(
            successResponse(seller, `Seller ${sellerId} has been unblocked`)
        )
        
    } catch (error) {
        next(error)
    }
}