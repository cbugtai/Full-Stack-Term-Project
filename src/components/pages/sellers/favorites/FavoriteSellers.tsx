import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import sellerData from "@/data/sellers_list.json";

export function SellersFavorites() {

  return (
    <div>
      <SellersNav />
      <h1>Favorite Sellers</h1>
      
      <SellersListDisplay sellers={
        sellerData.filter((seller) =>
          seller.isFavorite === true
          )
        }
      />
    </div>
  );
}