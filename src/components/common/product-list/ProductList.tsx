import type { Product } from "./sample-data/sample-data";
import ProductCard from "./ProductCard";
import ReviewFillForm from "./ReviewFillForm";
import ReviewsDisplay from "./ReviewsDisplay";
import React, { useEffect } from "react";

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

  const [isReviewDisplay, setIsReviewDisplay] = React.useState<
    { id: number; isReviewDisplay: boolean }[]
  >(products.map((p) => ({ id: p.id, isReviewDisplay: false })));

  const [ReviewDisplayProductId, setReviewDisplayProductId] =
    React.useState(1000000);

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
              setIsReviewDisplay={setIsReviewDisplay}
              setReviewDisplayProductId={setReviewDisplayProductId}
            />
          ))}
        </div>
        <div>
          {isReviewDisplay.some((r) => r.isReviewDisplay) ? (
            <ReviewsDisplay id={ReviewDisplayProductId} products={products} />
          ) : null}
          {isReview.some((r) => r.isReview) ? (
            <ReviewFillForm
              id={productId}
              description={description}
              updateProducts={updateProducts}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default ProductList;
