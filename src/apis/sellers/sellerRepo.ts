import type { Seller } from "@/types/sellerModel";
import { sellerData } from "./mockSellerData";

export async function fetchAllSellers(): Promise<Seller[]> {
    return sellerData;
}

export async function toggleFavoriteSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isFavorite = !seller.isFavorite;
    }
    return seller;
}  

export async function toggleBlockedSeller(sellerId: number): Promise<Seller | null> {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller){
        throw new Error(`Seller with ID ${sellerId} not found`);
    } else {
        seller.isBlocked = !seller.isBlocked;
    }
    return seller;
}