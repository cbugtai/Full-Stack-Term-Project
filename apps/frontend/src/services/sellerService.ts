import type { SellerDto as Seller } from "../../../../shared/types/seller-terms";
import * as sellerRepo from "../apis/sellers/sellerRepo";

/**
 * Fetch all sellers from the repository.
 * @returns A promise that resolves to an array of sellers.
 */
export async function getAllSellers(): Promise<Seller[]> {
  return sellerRepo.fetchAllSellers();
}

/**
 * Toggle the favorite status of a seller.
 * @param sellerId - The ID of the seller to toggle.
 * @returns The updated seller from the backend.
 */
export async function toggleFavoriteSeller(sellerId: number): Promise<Seller> {
    const seller = await sellerRepo.getSellerById(sellerId);

    if (seller.isFavorite) {
        return await sellerRepo.removeFavoriteSeller(seller.id);
    } else {
        return await sellerRepo.addFavoriteSeller(seller.id);
    }
}

/**
 * Toggle the blocked status of a seller.
 * A seller cannot be a favorite while blocked.
 * @param sellerId - The ID of the seller to toggle.
 * @returns The updated seller from the backend.
 */
export async function toggleBlockedSeller(sellerId: number): Promise<Seller> {
    const seller = await sellerRepo.getSellerById(sellerId);

    if (seller.isBlocked) {
        return await sellerRepo.removeBlockedSeller(seller.id);
    } else {

        if (seller.isFavorite) {
            await sellerRepo.removeFavoriteSeller(seller.id);
        }

        return await sellerRepo.addBlockedSeller(seller.id);
    }
}