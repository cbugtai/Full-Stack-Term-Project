import type { SellerDto as Seller, SellersPageDto} from "../../../../shared/types/seller-terms";
import * as sellerRepo from "../apis/sellers/sellerRepo";

/**
 * Fetch all sellers from the repository.
 * @returns A promise that resolves to an array of sellers.
 */
export async function getAllSellers(
    page?: number,
    pageSize?: number,
    sessionToken? : string|null
): Promise<SellersPageDto> {
   const sellers = await sellerRepo.fetchAllSellers(
    page,
    pageSize,
    sessionToken
);
   return sellers
}

/**
 * Toggle the favorite status of a seller.
 * @param sellerId - The ID of the seller to toggle.
 * @returns The updated seller from the backend.
 */
export async function toggleFavoriteSeller(sellerId: number, sessionToken? : string|null): Promise<Seller> {
    const seller = await sellerRepo.getSellerById(sellerId, sessionToken);

    if (seller.isFavorite) {
        return await sellerRepo.removeFavoriteSeller(seller.id, sessionToken);
    } else {
        return await sellerRepo.addFavoriteSeller(seller.id, sessionToken);
    }
}

/**
 * Toggle the blocked status of a seller.
 * A seller cannot be a favorite while blocked.
 * @param sellerId - The ID of the seller to toggle.
 * @returns The updated seller from the backend.
 */
export async function toggleBlockedSeller(sellerId: number, sessionToken? : string|null): Promise<Seller> {
    const seller = await sellerRepo.getSellerById(sellerId, sessionToken);

    if (seller.isBlocked) {
        return await sellerRepo.removeBlockedSeller(seller.id, sessionToken);
    } else {

        if (seller.isFavorite) {
            await sellerRepo.removeFavoriteSeller(seller.id, sessionToken);
        }

        return await sellerRepo.addBlockedSeller(seller.id, sessionToken);
    }
}