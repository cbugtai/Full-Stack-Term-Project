import type { JSX } from "react";
import { useUser } from "@clerk/clerk-react";
import type { SellerDto as Seller } from "../../../../../../../shared/types/seller-terms";
import { SellerCard } from "../sellerCard/SellerCard";

type SellersListDisplayProps = {
    sellers: Seller[];
    onFavoriteClick: (sellerId: number) => void
    onBlockClick: (sellerId: number) => void
    showFavoriteAction?: boolean;
    showBlockedAction?: boolean;
}

export function SellersListDisplay({
    sellers,
    onFavoriteClick,
    onBlockClick,
    showFavoriteAction = true,
    showBlockedAction = true
}: SellersListDisplayProps ): JSX.Element {
    const { isLoaded, isSignedIn} = useUser();
    const showActions = isLoaded && isSignedIn;

    return (
        <div className="sellers-list">
            {sellers.map((seller) => (
                <SellerCard
                    key={seller.id}
                    seller={seller}
                    onFavClick={() => onFavoriteClick(seller.id)}
                    onBlockClick={() => onBlockClick(seller.id)}
                    showActions={showActions}
                    showFavoriteAction={showFavoriteAction}
                    showBlockedAction={showBlockedAction}
                />
            ))}
        </div>
    );
}

