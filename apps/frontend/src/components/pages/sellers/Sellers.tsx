import { useEffect, useState } from "react";
import { SellersNav } from "../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../common/sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "../../common/search/Search";
import Pagination from "@/components/common/pagination/Pagination";
import { useSellers } from "@/hooks/useSellers";

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
    <div>
      <SellersNav />
      <h1>All Sellers</h1>

      <Search
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
        handleSearchSubmit={() => {
          setSearchTerm(searchValue);
        }}
      />

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
