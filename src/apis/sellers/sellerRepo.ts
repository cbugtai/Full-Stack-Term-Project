import type { Seller } from "@/types/sellerModel";
import { sellerData } from "./mockSellerData";

export async function fetchAllSellers(): Promise<Seller[]> {
    return sellerData;
}

export async function getSellerById(sellerId: number): Promise<Seller> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller) {
        throw new Error(`Seller with ID ${sellerId} not found`);
    }

    return seller;
}

export async function addFavoriteSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isFavorite = true;
    }

    return seller;
}

export async function removeFavoriteSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isFavorite = false;
    }

    return seller;
}

export async function addBlockedSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isBlocked = true;
    }

    return seller;
}

export async function removeBlockedSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isBlocked = false;
    }

    return seller;
}