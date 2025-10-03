import type { Product } from "./sample-data/sample-data";
import ProductCard from "./ProductCard";
import ReviewFillForm from "./ReviewFillForm";
import React from "react";

function ProductList({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [isReview, setIsReview] = React.useState<
    { id: number; isReview: boolean }[]
  >(products.map((p) => ({ id: p.id, isReview: false })));
  const [productId, setProductId] = React.useState(1000000);
  const [description, setDescription] = React.useState(
    "example product description"
  );
  return (
    <>
      <section className="product-list">
        <div className="product-list-gallery">
          {" "}
          {products.map((p) => (
            <ProductCard
              product={p}
              key={p.id}
              updateProducts={updateProducts}
              isReview={isReview}
              setIsReview={setIsReview}
              setProductId={setProductId}
              setDescription={setDescription}
            />
          ))}
        </div>
        {isReview.some((r) => r.isReview) ? (
          <ReviewFillForm
            id={productId}
            description={description}
            updateProducts={updateProducts}
          />
        ) : null}
      </section>
    </>
  );
}

function ReviewDisplay({
  reviews,
}: {
  reviews: { user: string; comment: string }[];
}) {
  return (
    <>
      <div>{updateProducts.find((p) => p.p)}</div>
    </>
  );
}

export default ProductList;
