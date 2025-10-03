import type { Product } from "@/components/common/product-list/sample-data/sample-data";
import ProductList from "@/components/common/product-list/ProductList";

/**
 * This component will display all terms provided as props, without any filter.
 */
export function AllProducts({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <>
      <header>
        <h1>Featured Products</h1>
      </header>
      <main>
        <ProductList products={products} updateProducts={updateProducts} />
      </main>
    </>
  );
}
