import { SellersNav } from "@/components/common/sellers/sellers-nav/SellersNav";
import { SellersListDisplay } from "@/components/common//sellers/sellersListDisplay/SellersListDisplay";
import type { Seller } from "@/types/sellerModel";

export function SellersFavorites({ sellers, setSellers }: {
  sellers: Seller[],
  setSellers: React.Dispatch<React.SetStateAction<Seller[]>>
}) {

  return (
    <div>
      <SellersNav />
      <h1>Favorite Sellers</h1>
      
      <SellersListDisplay sellers={
        sellers.filter((seller) =>
          seller.isFavorite === true
          )
        }
        setSellers={setSellers}
      />
    </div>
  );
}