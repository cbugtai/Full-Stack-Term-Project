import ProductList from "@/components/common/product-list/ProductList";
import { useProducts } from "@/hooks/useProducts";

/**
 * WishProducts Component
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
export function WishProducts() {
  const { allProducts, error, toggleWishedProduct, addReview } = useProducts();

  return (
    <>
      <h2>Products in Wishlist</h2>
      <section>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ProductList
            allProducts={allProducts.filter((p) => p.isWishlisted)}
            toggleWishedProduct={toggleWishedProduct}
            addReview={addReview}
          />
        )}
      </section>
    </>
  );
}
