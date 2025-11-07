import type { JSX } from "react";
import type { Seller } from "@/types/sellerModel";
import { useSellers } from "@/hooks/useSellers";
import { SellerCard } from "../sellerCard/SellerCard";

export function SellersListDisplay({
    dependencies = [],
    filterFn,
}: { 
    dependencies?: any[]; 
    filterFn: (seller: Seller) => boolean 
}): JSX.Element {
    const { sellers, toggleFavoriteSeller, toggleBlockedSeller } = useSellers(dependencies, filterFn);


    async function handleSellerFavClick(target: Seller) {
        try {
            await toggleFavoriteSeller(target.id);
        } catch (error) {
            console.error("Error favoriting seller:", error);
        }
    }

    async function handleSellerBlockClick(target: Seller) {
        try {
            await toggleBlockedSeller(target.id);
        } catch (error) {
            console.error("Error blocking seller:", error);
        }
    }

    return (
        <div className="sellers-list">
            {sellers.map((seller) => (
                <SellerCard 
                    key={seller.id}
                    seller={seller}
                    onFavClick={() => handleSellerFavClick(seller)}
                    onBlockClick={() => handleSellerBlockClick(seller)}
                />
            ))}
        </div>
    );
}

