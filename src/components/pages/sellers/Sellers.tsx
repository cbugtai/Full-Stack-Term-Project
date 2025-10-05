import { useState } from "react";
import type { Seller } from "@/types/sellerModel";
import sellerData from "@/data/sellers_list.json";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "@/components/common/search/Search";
import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";

function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>(sellerData);
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
          seller.username.toLowerCase().includes(
            searchValue.toLowerCase().trim())
          )
        }
      />
    </div>
  );
}

export default Sellers;
