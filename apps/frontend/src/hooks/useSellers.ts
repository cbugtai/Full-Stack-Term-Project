import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as sellerService from "../services/sellerService";
import type { SellerDto as Seller } from "../../../../shared/types/seller-terms";

export function useSellers(
    dependencies: unknown[] = [],
) {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                if (!isLoaded) return;

                let sessionToken = isSignedIn? await getToken() : null;
                let result = await sellerService.getAllSellers(sessionToken);

                setSellers(result);
            } catch (err) {
                setError(`${err}`);
            }
        };

        fetchSellers();
    }, [isLoaded, isSignedIn, getToken, ...dependencies]);

    const toggleFavoriteSeller = async (sellerId: number) => {
        try {
            let sessionToken = isSignedIn? await getToken() : null;

            if (!sessionToken) throw new Error("No session token available");

            const updated = await sellerService.toggleFavoriteSeller(sellerId, sessionToken);

            setSellers((prev) =>
                prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s ))
            )
        } catch (err) {
            setError(`${err}`);
        }
    };

    const toggleBlockedSeller = async (sellerId: number) => {
        try {
            let sessionToken = isSignedIn? await getToken() : null;

            if (!sessionToken) throw new Error("No session token available");
            
            const updated = await sellerService.toggleBlockedSeller(sellerId, sessionToken);

            setSellers((prev) => 
                prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s ))
            )
        } catch (err) {
            setError(`${err}`);
        }
    };

    return {
        sellers,
        error,
        toggleFavoriteSeller,
        toggleBlockedSeller
    };
}