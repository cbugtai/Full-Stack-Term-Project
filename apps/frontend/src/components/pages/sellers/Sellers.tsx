import { useEffect, useState } from "react";
import { SellersNav } from "../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../common/sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "../../common/search/Search";
import Pagination from "@/components/common/pagination/Pagination";
import { useSellers } from "@/hooks/useSellers";
import "./SellersPage.css"

function Sellers() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    sellers,
    error,
    loading,
    toggleFavoriteSeller,
    toggleBlockedSeller,
    page, 
    setPage, 
    maxPage
  } = useSellers([searchTerm])

  useEffect(() => {
    setPage(1);
  }, [searchTerm, setPage])

  const filteredSellers = sellers.filter((s) => 
    s.username.toLowerCase().includes(searchTerm.toLowerCase().trim()) && !s.isBlocked)

  return (
    <div className="sellers-page">
      <SellersNav />
      <div className="sellers-heading">
        <h1>All Sellers</h1>
        <p className="sellers-subtitle">Browse every seller, add favorites, or block those you do not want to see.</p>
      </div>

      <div className="sellers-toolbar">
        <Search
          searchValue={searchValue}
          handleSearchChange={setSearchValue}
          handleSearchSubmit={() => {
            setSearchTerm(searchValue);
          }}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-placeholder">Loading Sellers...</p>
      ) : (
        <SellersListDisplay
          sellers={filteredSellers}
          onFavoriteClick={toggleFavoriteSeller}
          onBlockClick={toggleBlockedSeller}
        />
      )}

      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
}

export default Sellers;
