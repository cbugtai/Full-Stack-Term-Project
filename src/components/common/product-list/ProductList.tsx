import type { Product } from "./sample-data/sample-data";
import ProductCard from "./ProductCard";
import React from "react";

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
              products={allProducts}
              key={p.id}
              addReview={addReview}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductList;
