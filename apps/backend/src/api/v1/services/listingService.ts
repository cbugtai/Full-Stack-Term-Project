import { Listings } from "@prisma/client";
import prisma from "../../../../prisma/client";
import { blobClient } from "../vercel/blobClient";

export async function createListing(data: {
    sellerId: number;
    title: string;
    description: string;
    categoryId: number;
    conditionId: number;
    price: number;
    originalPrice: number;
    statusId: number;
    city: string;
    isNegotiable: boolean;
    isFree: boolean;
    brandId: number;
    file?: Express.Multer.File;
}): Promise<Listings> {
    let imageUrl = "";

    if (data.file) {
        const timestamp = Date.now();
        const blobName = `listing-${timestamp}-${data.file.originalname}`;
        imageUrl = await blobClient.upload(blobName, data.file.buffer);
    }

    return prisma.listings.create({
        data: {
            sellerId: data.sellerId,
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            conditionId: data.conditionId,
            price: data.price,
            originalPrice: data.originalPrice,
            statusId: data.statusId,
            imageUrl,
            city: data.city,
            isNegotiable: data.isNegotiable,
            isFree: data.isFree,
            brandId: data.brandId,
        },
    });
}

export async function updateListing(
    id: number,
    data: Partial<Listings>,
    newFile?: Express.Multer.File
) {
    const listing = await prisma.listings.findUnique({ where: { id } });
    if (!listing) throw new Error("Listing not found");

    let imageUrl = listing.imageUrl;

    if (newFile) {
        const timestamp = Date.now();
        const blobName = `listing-${timestamp}-${newFile.originalname}`;
        imageUrl = await blobClient.upload(blobName, newFile.buffer);
    }

    return prisma.listings.update({
        where: { id },
        data: { ...data, imageUrl },
    });
}

export async function deleteListing(id: number) {
    return prisma.listings.delete({ where: { id } });
}

export async function getListingById(id: number) {
    return prisma.listings.findUnique({ where: { id } });
}

export async function getListingsBySeller(sellerId: number) {
    return prisma.listings.findMany({ where: { sellerId } });
}