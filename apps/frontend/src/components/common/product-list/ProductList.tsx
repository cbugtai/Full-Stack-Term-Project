import type { ProductListParams } from "@/types/productModel";

import ProductCard from "./ProductCard";
import { useTempUser } from "@/hooks/useTempUser";

function ProductList({
  allProducts,
  addReview,
  toggleWishedProduct,
}: ProductListParams) {
  // this userid will be replaced with real user auth in future
  const { tempUserId, error } = useTempUser();

  return (
    <>
      {error || tempUserId === null ? (
        <p className="error-message">{error}</p>
      ) : (
        <section className="product-list">
          <div className="product-list-gallery">
            {" "}
            {allProducts.map((p) => (
              <ProductCard
                product={p}
                userId={tempUserId}
                key={p.id}
                addReview={addReview}
                toggleWishedProduct={toggleWishedProduct}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default ProductList;
