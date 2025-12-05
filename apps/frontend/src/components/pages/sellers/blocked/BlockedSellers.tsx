import { SellersNav } from "../../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../../common/sellers/sellersListDisplay/SellersListDisplay";
import Pagination from "@/components/common/pagination/Pagination";
import { useSellers } from "@/hooks/useSellers";

export function SellersBlocked() {
  const {
    sellers,
    error,
    loading,
    toggleFavoriteSeller,
    toggleBlockedSeller,
    page,
    setPage,
    maxPage,
  } = useSellers();

  // Only show blocked sellers
  const blockedSellers = sellers.filter((s) => s.isBlocked);

  return (
    <div>
      <SellersNav />
      <h1>Blocked Sellers</h1>

      {error && <p className="error-message">{error}</p>}
      
      {loading ? (
        <p className="loading-placeholder">Loading Sellers...</p>
      ) : (
        <SellersListDisplay
          sellers={blockedSellers}
          onFavoriteClick={toggleFavoriteSeller}
          onBlockClick={toggleBlockedSeller}
          showFavoriteAction={false}  // match your original behavior
          showBlockedAction={true}    // allow Unblock button
        />
      )}

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
}