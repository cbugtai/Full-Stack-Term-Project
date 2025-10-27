import type { Seller } from "@/types/sellerModel";
import * as sellerRepo from "@/apis/sellers/sellerRepo";

/**
 * Fetch all sellers from the repository.
 * @returns A promise that resolves to an array of sellers.
 */
export async function getAllSellers(): Promise<Seller[]> {
    const sellers = await sellerRepo.fetchAllSellers();
    return sellers;
}

/**
 * Toggle the favorite status of a seller.
 * @param sellerId - The ID of the seller to toggle.
 */
export async function toggleFavoriteSeller(sellerId: number): Promise<void> {
    const seller = await sellerRepo.getSellerById(sellerId);
    if (seller.isFavorite) {
        await sellerRepo.removeFavoriteSeller(seller.id);
    } else {
        await sellerRepo.addFavoriteSeller(seller.id);
    }
}

/**
 * Toggle the blocked status of a seller.
 * A seller cannot be a favorite while blocked.
 * @param sellerId - The ID of the seller to toggle.
 */
export async function toggleBlockedSeller(sellerId: number): Promise<void> {
    const seller = await sellerRepo.getSellerById(sellerId);
    if (seller.isBlocked) {
        await sellerRepo.removeBlockedSeller(seller.id);
    } else {
        await sellerRepo.removeFavoriteSeller(seller.id);
        await sellerRepo.addBlockedSeller(seller.id);
    }
}