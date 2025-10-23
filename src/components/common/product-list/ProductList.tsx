import type { Product } from "@/types/productModel";
import ProductCard from "./ProductCard";

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
  return (
    <>
      <section className="product-list">
        <div className="product-list-gallery">
          {" "}
          {allProducts.map((p) => (
            <ProductCard
              product={p}
              allProducts={allProducts}
              key={p.id}
              addReview={addReview}
              toggleWishedProduct={toggleWishedProduct}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductList;
