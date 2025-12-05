import { SellersNav } from "../../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../../common/sellers/sellersListDisplay/SellersListDisplay";
import Pagination from "@/components/common/pagination/Pagination";
import { useSellers } from "@/hooks/useSellers";
import "../SellersPage.css"

export function SellersFavorites() {
  const {
    sellers,
    error,
    loading,
    toggleFavoriteSeller,
    toggleBlockedSeller,
    page,
    setPage,
    maxPage
  } = useSellers()

  // show only favorite sellers
  const favoriteSellers = sellers.filter(
    (s) => s.isFavorite && !s.isBlocked
  );

  return (
    <div className="sellers-page">
      <SellersNav />
      <div className="sellers-heading">
        <h1>Favorite Sellers</h1>
        <p className="sellers-subtitle">Keep track of the sellers you trust the most and revisit them quickly.</p>
      </div>

      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <p className="loading-placeholder">Loading Sellers...</p>
      ) : (
        <SellersListDisplay
          sellers={favoriteSellers}
          onFavoriteClick={toggleFavoriteSeller}
          onBlockClick={toggleBlockedSeller}
          // defaults: showFavoriteAction = true, showBlockedAction = true
        />
      )}

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
}