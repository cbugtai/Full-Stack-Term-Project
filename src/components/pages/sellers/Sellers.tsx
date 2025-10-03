import { useState } from "react";
import type { Seller } from "@/types/sellerModel";
import sellerData from "@/data/sellers_list.json";
import { SellersListDisplay } from "./sellersListDisplay/SellersListDisplay";

function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>(sellerData);

  return (
    <div>
      <h1>List of all sellers</h1>
      <SellersListDisplay sellers={sellers} />
    </div>
  );
}

export default Sellers;
