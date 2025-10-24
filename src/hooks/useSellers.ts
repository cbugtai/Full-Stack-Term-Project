import { useEffect,useState } from "react";
import * as sellerService from "../services/sellerService";
import type { Seller } from "../types/sellerModel";

export function useSellers(
    dependencies: unknown[],
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
            await sellerService.toggleFavoriteSeller(sellerId);
            await fetchSellers();
        } catch (err) {
            setError(`${err}`);
        }
    };

    const toggleBlockedSeller = async (sellerId: number) => {
        try {
            await sellerService.toggleBlockedSeller(sellerId);
            await fetchSellers();
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