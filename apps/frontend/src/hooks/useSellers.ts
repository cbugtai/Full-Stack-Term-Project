import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as sellerService from "../services/sellerService";
import type { SellerDto as Seller } from "../../../../shared/types/seller-terms";
import { usePagination } from "./usePagination";

export function useSellers(
    dependencies: unknown[] = [],
) {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn, isLoaded } = useAuth();
    const { page, setPage, maxPage, setMaxPage, pageSize } = usePagination(10);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                if (!isLoaded) return;
                
                const sessionToken = isSignedIn? await getToken() : null;
                const result = await sellerService.getAllSellers(
                    page,
                    pageSize,
                    sessionToken
                );

                setSellers(result.sellers);
                setMaxPage(result.meta.totalPages || 1);
            } catch (err) {
                setError(`${err}`);
            }
        };

        fetchSellers();
    }, [isLoaded, isSignedIn, getToken, page, pageSize, ...dependencies]);

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
        toggleBlockedSeller,
        page,
        setPage,
        maxPage
    };
}