import { Request, Response } from "express";
import * as listingService from "../services/listingService";

export const createListing = async (req: Request, res: Response) => {
    const body = req.body;

    const listing = await listingService.createListing({
        ...body,
        sellerId: Number(body.sellerId),
        price: Number(body.price),
        originalPrice: Number(body.originalPrice),
        statusId: Number(body.statusId),
        brandId: Number(body.brandId),
        categoryId: Number(body.categoryId),
        conditionId: Number(body.conditionId),
        isNegotiable: body.isNegotiable === true,
        isFree: body.isFree === true,
        file: req.file,
    });

    res.status(201).json(listing);
};

export const getListingById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const listing = await listingService.getListingById(id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.json(listing);
};

export const getListingsBySeller = async (req: Request, res: Response) => {
    const sellerId = Number(req.params.sellerId);
    const listings = await listingService.getListingsBySeller(sellerId);
    res.json(listings);
};

export const updateListing = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await listingService.updateListing(id, req.body);
    res.json(updated);
};

export const deleteListing = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await listingService.deleteListing(id);
    res.status(204).send();
};