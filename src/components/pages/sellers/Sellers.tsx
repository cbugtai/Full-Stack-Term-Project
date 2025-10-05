import { useState } from "react";
import type { Seller } from "@/types/sellerModel";
import sellerData from "@/data/sellers_list.json";
import { SellersListDisplay } from "./sellersListDisplay/SellersListDisplay";
import { Search } from "./search/Search";

function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>(sellerData);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <h1>Sellers</h1>

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
