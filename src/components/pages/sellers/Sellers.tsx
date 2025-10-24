import { useState } from "react";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "@/components/common/search/Search";
import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";

function Sellers() {
  
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <SellersNav />
      <h1>All Sellers</h1>

      <Search
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
      />
  
      <SellersListDisplay
        dependencies={[searchValue]}
        filterFn={(s) => s.username.toLowerCase().includes(searchValue) && !s.isBlocked}
      />
    </div>
  );
}

export default Sellers;
