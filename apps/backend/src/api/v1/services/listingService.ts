import { Listings } from "@prisma/client";
import prisma from "../../../../prisma/client";
import { put, del } from "@vercel/blob";

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
    file?: File;
}): Promise<Listings> {

    let imageUrl = "";

    if (data.file) {
        const upload = await put(`listing-${Date.now()}`, data.file, { access: "public" });
        imageUrl = upload.url;
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
        }
    });
}

export async function getListingById(id: number) {
    return prisma.listings.findUnique({ where: { id } });
}

export async function getListingsBySeller(sellerId: number) {
    return prisma.listings.findMany({ where: { sellerId } });
}

export async function updateListing(id: number, data: Partial<Listings>, newFile?: File) {
    const listing = await prisma.listings.findUnique({ where: { id } });
    if (!listing) throw new Error("Listing not found");

    let imageUrl = listing.imageUrl;

    if (newFile) {
        if (imageUrl) await del(imageUrl);
        const upload = await put(`listing-${Date.now()}`, newFile, { access: "public" });
        imageUrl = upload.url;
    }

    return prisma.listings.update({
        where: { id },
        data: { ...data, imageUrl }
    });
}

export async function deleteListing(id: number) {
    const listing = await prisma.listings.findUnique({ where: { id } });
    if (!listing) throw new Error("Listing not found");

    if (listing.imageUrl) await del(listing.imageUrl);

    return prisma.listings.delete({ where: { id } });
}