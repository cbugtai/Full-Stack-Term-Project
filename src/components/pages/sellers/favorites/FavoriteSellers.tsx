import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import type { Seller } from "@/types/sellerModel";

export function SellersFavorites() {

  return (
    <div>
      <SellersNav />
      <h1>Favorite Sellers</h1>
      <SellersListDisplay filterFn={(s: Seller) => s.isFavorite && !s.isBlocked} />
    </div>
  );
}