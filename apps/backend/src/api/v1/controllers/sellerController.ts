import { Request, Response, NextFunction } from "express";
import { SellerDto, SellersPageDto } from "../../../../../../shared/types/seller-terms";
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

export const addSeller = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const userId = getUserId(req);
        const { rating } = req.body;

        const seller: SellerDto = await sellerService.addSeller(userId, rating)

        res.status(200).json(
            successResponse(seller, "Seller created Successfully")
        )
    } catch (error) {
        next (error)
    }
}

export const getAllSellers = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as AuthRequest).userId;

        // get the page and pageSize from query parameters
        const page: number = Number.parseInt(req.query.page as string) || 1;
        let pageSize: number = Number.parseInt(req.query.pageSize as string) || 12;
        if (pageSize > 20) {
        pageSize = 20; // set a maximum page size limit
        }

        const sellersRes: SellersPageDto | undefined = 
            await sellerService.fetchAllSellers(userId, page, pageSize)
        
        res.status(200).json(
            successResponse(sellersRes, `Sellers retrieved successfully`)
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

export const getSellerByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = getUserId(req);
        const seller = await sellerService.fetchSellerByUser(userId);

        res.status(200).json(
            successResponse(seller, "Seller retrieved for current user")
        );
    } catch (err) {
        next(err);
    }
};