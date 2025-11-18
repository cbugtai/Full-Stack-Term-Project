import { SellersNav } from "../../../common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "../../../common/sellers/sellersListDisplay/SellersListDisplay";
import type { SellerDto as Seller } from "../../../../../../../shared/types/seller-terms";

export function SellersBlocked() {

  return (
    <div>
      <SellersNav />
      <h1>Blocked Sellers</h1>
      <SellersListDisplay filterFn={(s: Seller) => s.isBlocked} />
    </div>
  );
}