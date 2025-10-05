import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import sellerData from "@/data/sellers_list.json";

export function SellersBlocked() {

  return (
    <div>
      <SellersNav />
      <h1>Blocked Sellers</h1>
      
      <SellersListDisplay sellers={
        sellerData.filter((seller) =>
          seller.isBlocked === true
          )
        }
      />
    </div>
  );
}