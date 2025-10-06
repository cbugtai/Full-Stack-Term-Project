import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import type { Seller } from "@/types/sellerModel";

export function SellersBlocked({ sellers, setSellers }: {
  sellers: Seller[],
  setSellers: React.Dispatch<React.SetStateAction<Seller[]>>
}) {

  return (
    <div>
      <SellersNav />
      <h1>Blocked Sellers</h1>
      
      <SellersListDisplay sellers={
        sellers.filter((seller) =>
          seller.isBlocked === true
          )
        }
        setSellers={setSellers}
      />
    </div>
  );
}