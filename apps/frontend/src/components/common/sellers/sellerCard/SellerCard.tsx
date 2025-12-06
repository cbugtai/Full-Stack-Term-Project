import type { SellerDto as Seller } from "../../../../../../../shared/types/seller-terms";
import "./sellerCard.css"

export function SellerCard(
    {
        seller,
        onFavClick,
        onBlockClick,
        showActions = true,
        showFavoriteAction = true,
        showBlockedAction = true
    }: {
        seller: Seller
        onFavClick: () => void
        onBlockClick: () => void
        showActions?: boolean
        showFavoriteAction?: boolean
        showBlockedAction?: boolean
        
    }
) {
    const formattedRating = seller.rating.toFixed(1);
    const starFillPercent = Math.max(0, Math.min(5, seller.rating)) * 20;

    return (
        <div className="seller-card">

            <div className="seller-avatar">
                <img src={seller.photo} alt="Seller Avatar" width="50" height="50" />
            </div>

            <div className="seller-name-row">
                <div className="seller-name">{seller.username}</div>
                    {seller.isBlocked && <span className="badge badge-blocked">Blocked</span>}
                    {!seller.isBlocked && seller.isFavorite && (
                        <span className="badge badge-favorite">Favorite</span>
                    )}
            </div>

            <div className="seller-sold">
                {seller.completedSales} completed sales
            </div>

            <div 
                className="seller-rating" 
                aria-label={`Rating ${formattedRating} out of 5`}
            >
                <div className="rating-stars" aria-hidden="true">
                    <div className="rating-stars-bg">★★★★★</div>
                        <div 
                            className="rating-stars-fill" 
                            style={{ width: `${starFillPercent}%` }}
                        >
                            ★★★★★
                        </div>
                    </div>
                    <span className="rating-value">{formattedRating}</span>
                </div>
            
            {showActions && (
                <div className="seller-actions">
                    {showFavoriteAction && (
                        <button 
                            className="seller-button seller-button-primary" 
                            onClick={onFavClick}
                        >
                            {seller.isFavorite ? "Unfavorite" : "Favorite"}
                        </button>
                    )}

                    {showBlockedAction && (
                        <button 
                            className="seller-button seller-button-ghost" 
                            onClick={onBlockClick}
                        >
                            {seller.isBlocked ? "Unblock" : "Block"}
                        </button>
                    )}    
                </div>
            )}

        </div>
    );
}