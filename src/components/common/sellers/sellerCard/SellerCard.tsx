import type { Seller } from "@/types/sellerModel";

export function SellerCard(
    { 
        seller,
        onFavClick,
        onBlockClick
    }: {
        seller: Seller
        onFavClick: () => void
        onBlockClick: () => void
    }
) {
    return (
        <div className="seller-card">
            <img src={seller.photo} alt="Seller Avatar" width="50" height="50" />
            <div className="seller-name">
                {seller.username}
            </div>
            <div className="seller-rating">
                rating={seller.rating}
            </div>
            <div className="seller-sold">
                {seller.completed_sales} Completed Sales
            </div>
            <button onClick={onFavClick}>
                {seller.isFavorite ? "Unfavorite" : "Favorite"}
            </button>
            <button onClick={onBlockClick}>
                {seller.isBlocked ? "Unblock" : "Block"}
            </button>
        </div>
    );
}