import type { Seller } from "@/types/sellerModel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import "./FavoriteButton.css";

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
            <img src={seller.photo} alt={seller.username} width="50" height="50" />
            <div className="seller-name">
                {seller.username}
            </div>
            <div className="seller-rating">
                rating={seller.rating}
            </div>
            <div className="seller-sold">
                {seller.completed_sales} Completed Sales
            </div>
            <FavoriteButton isFavorite={seller.isFavorite} onClick={onFavClick} />
             {/* <button onClick={onFavClick}>
                {seller.isFavorite ? "Unfavorite" : "Favorite"}
            </button>  */}
            <button onClick={onBlockClick}>
                {seller.isBlocked ? "Unblock" : "Block"}
            </button>
        </div>
    );
}

function FavoriteButton({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    
    return (
    <button
      className="favorite-btn"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Unfavorite" : "Favorite"}
    >
      {isFavorite || hovered ? (
        <FaHeart className="heart filled" />
      ) : (
        <FaRegHeart className="heart outline" />
      )}
    </button>
  );
}