import ProductList from "@/components/common/product-list/ProductList";
import { useProducts } from "@/hooks/useProducts";

/**
 * This component will display all products provided as props, without any filter.
 */
export function AllProducts() {
  const { allProducts, error, toggleWishedProduct, addReview } = useProducts();

  return (
    <>
      <h2>Featured Products</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <section>
          <ProductList
            allProducts={allProducts}
            addReview={addReview}
            toggleWishedProduct={toggleWishedProduct}
          />
        </section>
      )}
    </>
  );
}
