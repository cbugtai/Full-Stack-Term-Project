import { AllProducts } from "../product/AllProducts";
import TopSellers from "./top-sellers/TopSellers";
import Testimonials from "./testimonials/testimonials";
import type { Product } from "../../common/product-list/sample-data/sample-data";
import type { Seller } from "@/types/sellerModel";

function Landing({
  products,
  updateProducts,
  sellers,
  setSellers
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sellers: Seller[];
  setSellers: React.Dispatch<React.SetStateAction<Seller[]>>;
}) {
  return (
    <main>
      {/* render the featured product list */}
      <AllProducts products={products} updateProducts={updateProducts} />
      {/* render list of sellers with descending reputation */}
      <TopSellers sellers={sellers} setSellers={setSellers} />
      {/* render the testimonial slider */}
      <Testimonials />
    </main>
  );
}

export default Landing;
