import type { JSX } from "react";
import type { Seller } from "@/types/sellerModel";
import { SellerCard } from "../sellerCard/SellerCard";

export function SellersListDisplay({ 
    sellers,
    setSellers
}: {
    sellers: Seller[],
    setSellers: React.Dispatch<React.SetStateAction<Seller[]>>
}) {

    function handleSellerFavClick(target: Seller) {
        setSellers(prev =>
            prev.map(seller =>
                seller.id === target.id
                    ? { ...seller, isFavorite: !seller.isFavorite }
                    : seller
            )
        );
    }

    function handleSellerBlockClick(target: Seller) {
        setSellers(prev =>
            prev.map(seller =>
                seller.id === target.id
                    ? { ...seller, isBlocked: !seller.isBlocked }
                    : seller
            )
        );
    }

    const sellerListItems: JSX.Element[] = sellers.map((seller) => {
        return (
            <SellerCard 
                seller={seller}
                key={seller.id}
                onFavClick={() => {
                    handleSellerFavClick(seller);
                }}
                onBlockClick={() => {
                    handleSellerBlockClick(seller);
                }}
            />
        );
    });

    return (
        <div className="sellers-list">
            {sellerListItems}
        </div>
    );
}