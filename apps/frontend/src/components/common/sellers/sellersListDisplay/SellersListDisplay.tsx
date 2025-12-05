import type { JSX } from "react";
import { useUser } from "@clerk/clerk-react";
import type { SellerDto as Seller } from "../../../../../../../shared/types/seller-terms";
import { useSellers } from "../../../../hooks/useSellers";
import { SellerCard } from "../sellerCard/SellerCard";

type SellersListDisplayProps = {
  dependencies?: unknown[];
  filterFn?: (seller: Seller) => boolean;
  showFavoriteAction?: boolean;
  showBlockedAction?: boolean;
}

export function SellersListDisplay({
    dependencies = [],
    filterFn,
    showFavoriteAction = true,
    showBlockedAction = true
}: SellersListDisplayProps ): JSX.Element {
    const { sellers, toggleFavoriteSeller, toggleBlockedSeller } =
        useSellers(dependencies, filterFn);
    const { isLoaded, isSignedIn} = useUser();
    const showActions = isLoaded && isSignedIn;


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
                    showActions={showActions}
                    showFavoriteAction={showFavoriteAction}
                    showBlockedAction={showBlockedAction}
                />
            ))}
        </div>
    );
}

