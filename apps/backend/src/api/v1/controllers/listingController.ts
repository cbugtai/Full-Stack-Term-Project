import { Request, Response } from "express";
import * as listingService from "../services/listingService";

export const createListing = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const listing = await listingService.createListing({
            sellerId: Number(body.sellerId),
            title: body.title,
            description: body.description,
            categoryId: Number(body.categoryId),
            conditionId: Number(body.conditionId),
            price: Number(body.price),
            originalPrice: Number(body.originalPrice),
            statusId: Number(body.statusId),
            city: body.city,
            isNegotiable: body.isNegotiable === 'true' || body.isNegotiable === true,
            isFree: body.isFree === 'true' || body.isFree === true,
            brandId: Number(body.brandId),
            file: req.file,
        });

        res.status(201).json(listing);
    } catch (err: any) {
        console.error("Error creating listing:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

export const getListingById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const listing = await listingService.getListingById(id);
        if (!listing) return res.status(404).json({ error: "Listing not found" });
        res.json(listing);
    } catch (err: any) {
        console.error("Error fetching listing:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

export const getListingsBySeller = async (req: Request, res: Response) => {
    try {
        const sellerId = Number(req.params.sellerId);
        const listings = await listingService.getListingsBySeller(sellerId);
        res.json(listings);
    } catch (err: any) {
        console.error("Error fetching listings for seller:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

export const updateListing = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updated = await listingService.updateListing(id, req.body, req.file);
        res.json(updated);
    } catch (err: any) {
        console.error("Error updating listing:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

export const deleteListing = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await listingService.deleteListing(id);
        res.status(204).send();
    } catch (err: any) {
        console.error("Error deleting listing:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};