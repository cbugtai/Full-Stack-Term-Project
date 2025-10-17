import type { Seller } from "@/types/sellerModel";
import { sellerData } from "./mockSellerData";

export function fetchSellers(): Seller[] {
    return sellerData;
}

export function getSellerById(id: number): Seller {
    const found = sellerData.find(s => s.id === id);
    if (!found) {
        throw new Error(`Seller with ID ${id} not found`);
    }
    return found;
}

export async function addSeller(newSeller: Seller) {
    const exists = sellerData.some(s => s.id === newSeller.id);
    if (exists) {
        throw new Error(`Seller with ID ${newSeller.id} already exists`);
    }
    sellerData.push(newSeller);
}

export async function updateSeller(updated: Seller) {
    const index = sellerData.findIndex(s => s.id === updated.id);
    if (index === -1) {
        throw new Error(`Seller with ID ${updated.id} not found`);
    }
    sellerData[index] = updated;
}

export async function addfavoriteSeller(sellerId: number) {
    const seller = getSellerById(sellerId);
    seller.isFavorite = true;
    return seller;
}

export async function removeFavoriteSeller(sellerId: number) {
    const seller = getSellerById(sellerId);
    seller.isFavorite = false;
    return seller;
}

export async function blockSeller(sellerId: number) {
    const seller = getSellerById(sellerId);
    seller.isBlocked = true;
    return seller;
}

export async function unblockSeller(sellerId: number) {
    const seller = getSellerById(sellerId);
    seller.isBlocked = false;
    return seller;
}