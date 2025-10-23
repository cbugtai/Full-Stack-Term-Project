import type { Product } from "@/components/common/product-list/sample-data/sample-data";
import ProductList from "@/components/common/product-list/ProductList";
import { useProducts } from "@/hooks/useProducts";

/**
 * This component will display all products provided as props, without any filter.
 */
export function AllProducts({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const { allProducts, error, toggleWishedProduct, addReview } = useProducts();

  return (
    <>
      <h2>Featured Products</h2>
      <section>
        <ProductList
          allProducts={allProducts}
          addReview={addReview}
          toggleWishedProduct={toggleWishedProduct}
        />
      </section>
    </>
  );
}
