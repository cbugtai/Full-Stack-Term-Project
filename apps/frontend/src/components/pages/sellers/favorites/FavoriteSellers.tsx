import { SellersNav } from "../../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../../common/sellers/sellersListDisplay/SellersListDisplay";
import Pagination from "@/components/common/pagination/Pagination";
import { useSellers } from "@/hooks/useSellers";

export function SellersFavorites() {
  const {
    sellers,
    error,
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
    <div>
      <SellersNav />
      <h1>Favorite Sellers</h1>

      {error ? (
        <p className="error-message">{error}</p>
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