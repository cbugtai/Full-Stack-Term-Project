import { useState } from "react";
import { SellersNav } from "../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../common/sellers/sellersListDisplay/SellersListDisplay";
import { Search } from "../../common/search/Search";

function Sellers() {
  
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  
      <SellersListDisplay
        dependencies={[]}
        filterFn={(s) => 
          s.username.toLowerCase().includes(searchTerm.toLowerCase().trim()) && 
          !s.isBlocked}
      />
    </div>
  );
}

export default Sellers;
