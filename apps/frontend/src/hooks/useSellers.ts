import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as sellerService from "../services/sellerService";
import type { SellerDto as Seller } from "../../../../shared/types/seller-terms";

export function useSellers(
    dependencies: unknown[] = [],
    filterFn?: (seller: Seller) => boolean
) {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn } = useAuth();

    const fetchSellers = async () => {
        try {
            let sessionToken = isSignedIn? await getToken() : null;
            let result = await sellerService.getAllSellers(sessionToken);

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
            let sessionToken = isSignedIn? await getToken() : null;

            if (!sessionToken) throw new Error("No session token available");

            const updated = await sellerService.toggleFavoriteSeller(sellerId, sessionToken);

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
            let sessionToken = isSignedIn? await getToken() : null;

            if (!sessionToken) throw new Error("No session token available");
            
            const updated = await sellerService.toggleBlockedSeller(sellerId, sessionToken);

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