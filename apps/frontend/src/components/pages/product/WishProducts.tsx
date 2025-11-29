import ProductList from "@/components/common/product-list/ProductList";
import ProductPagination from "@/components/common/product-pagination/ProductPagination";
import { useWishlistedProducts } from "@/hooks/useWishlistedProducts";

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
  const {
    wishlistedProducts,
    error,
    toggleWishedProduct,
    addReview,
    loading,
    page,
    setPage,
    maxPage,
  } = useWishlistedProducts();

  if (loading) {
    return (
      <div className="loading-placeholder">Loading Wishlisted Products...</div>
    );
  }

  return (
    <>
      <h2>Products in Wishlist</h2>
      <section>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ProductList
            allProducts={wishlistedProducts}
            toggleWishedProduct={toggleWishedProduct}
            addReview={addReview}
          />
        )}
      </section>
      <ProductPagination page={page} setPage={setPage} maxPage={maxPage} />
    </>
  );
}
