import { useEffect,useState } from "react";
import * as sellerService from "../services/sellerService";
import type { SellerDto as Seller } from "../../../../shared/types/seller-terms";

export function useSellers(
    dependencies: unknown[] = [],
    filterFn?: (seller: Seller) => boolean
) {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchSellers = async () => {
        try {
            let result = await sellerService.getAllSellers();

            if (filterFn) {
                result = result.filter(filterFn);
            }

            setSellers([...result]);
        } catch (err) {
            setError(`${err}`);
        }

    };

    const toggleFavoriteSeller = async (sellerId: number) => {
        try {
            const updated = await sellerService.toggleFavoriteSeller(sellerId);

            setSellers((prev) => {
                const updatedList = prev.map((s) => 
                s.id === updated.id ? { ...s, ...updated } : s
            )

            return filterFn ? updatedList.filter(filterFn) : updatedList;
            })
        } catch (err) {
            setError(`${err}`);
        }
    };

    const toggleBlockedSeller = async (sellerId: number) => {
        try {
            const updated = await sellerService.toggleBlockedSeller(sellerId);

            setSellers((prev) => {
                const updatedList = prev.map((s) => 
                s.id === updated.id ? { ...s, ...updated } : s
            )

            return filterFn ? updatedList.filter(filterFn) : updatedList;
            })
        } catch (err) {
            setError(`${err}`);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, [...dependencies]);

    return {
        sellers,
        error,
        toggleFavoriteSeller,
        toggleBlockedSeller
    };
}