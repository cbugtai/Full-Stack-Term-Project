import type { JSX } from "react";
import type { Seller } from "@/types/sellerModel";
import { SellerCard } from "../sellerCard/SellerCard";

export function SellersListDisplay({ 
    sellers
}: {
    sellers: Seller[]
}) {

    const sellerListItems: JSX.Element[] = sellers.map((seller) => {
        return (
            <SellerCard 
                seller={seller}
                key={seller.id}
            />
        );
    });

    return (
        <div className="sellers-list">
            {sellerListItems}
        </div>
    );
}