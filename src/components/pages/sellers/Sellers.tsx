import { useState } from "react";
import type { Seller } from "@/types/sellerModel";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "@/components/common/search/Search";
import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";

function Sellers({
  sellers,
  setSellers
}: {
  sellers: Seller[],
  setSellers: React.Dispatch<React.SetStateAction<Seller[]>>
}) {
  
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <SellersNav />
      <h1>All Sellers</h1>

      <Search
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
      />
      
      <SellersListDisplay sellers={
        sellers.filter((seller) =>
          !seller.isBlocked &&
          seller.username.toLowerCase().includes(
            searchValue.toLowerCase().trim())
          )
        }
        setSellers={setSellers}
      />
    </div>
  );
}

export default Sellers;
