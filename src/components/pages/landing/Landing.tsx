import { AllProducts } from "../product/AllProducts";
import TopSellers from "./top-sellers/TopSellers";
import Testimonials from "./testimonials/testimonials";
import type { Product } from "../../common/product-list/sample-data/sample-data";

function Landing({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <main>
      {/* render the featured product list */}
      <AllProducts products={products} updateProducts={updateProducts} />
      {/* render list of sellers with descending reputation */}
      <TopSellers />
      {/* render the testimonial slider */}
      <Testimonials />
    </main>
  );
}

export default Landing;
