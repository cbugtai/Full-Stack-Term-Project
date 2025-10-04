import type { Product } from "@/components/common/product-list/sample-data/sample-data";
import ProductList from "@/components/common/product-list/ProductList";

/**
 * This component will display all terms provided as props, without any filter.
 */
export function WishProducts({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <>
      <h2>Products in Wishlist</h2>
      <section>
        <ProductList
          products={products.filter((p) => p.isWishlisted)}
          updateProducts={updateProducts}
        />
      </section>
    </>
  );
}
