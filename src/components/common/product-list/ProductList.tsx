import type { Product } from "./sample-data/sample-data";
import ProductCard from "./ProductCard";
import React from "react";

function ProductList({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <>
      <section className="product-list">
        <div className="product-list-gallery">
          {" "}
          {products.map((p) => (
            <ProductCard
              product={p}
              products={products}
              key={p.id}
              updateProducts={updateProducts}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductList;
