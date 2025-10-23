import ProductList from "@/components/common/product-list/ProductList";
import { useProducts } from "@/hooks/useProducts";

/**
 * AllProducts Component
 * ---------------------
 * HOW:
 * - Calls `useProducts()` custom hook to load product data.
 * - The hook communicates with `ProductService` for business logic,
 *   which fetches data through `ProductRepo`.
 *
 * WHY:
 * - To keep the UI layer independent from data fetching logic.
 * - Make the component indepedent to the data handling logical
 * - to improves maintainability and readability.
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
