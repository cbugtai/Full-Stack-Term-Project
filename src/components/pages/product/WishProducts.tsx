import ProductList from "@/components/common/product-list/ProductList";
import { useProducts } from "@/hooks/useProducts";

/**
 * This component will display all terms provided as props, without any filter.
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
