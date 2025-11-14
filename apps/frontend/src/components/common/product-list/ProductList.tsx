import type { Product } from "../../../../../../shared/types/frontend-product";
import ProductCard from "./ProductCard";
import { useTempUser } from "@/hooks/useTempUser";

function ProductList({
  allProducts,
  addReview,
  toggleWishedProduct,
}: {
  allProducts: Product[];
  addReview: ({
    productId,
    comment,
  }: {
    productId: number;
    comment: string;
  }) => void;
  toggleWishedProduct: (productId: number) => void;
}) {
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
                allProducts={allProducts}
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
