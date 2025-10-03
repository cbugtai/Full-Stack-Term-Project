import type { Product } from "./sample-data/sample-data";
import ProductCard from "./ProductCard";
import ReviewFillForm from "./ReviewFillForm";
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

  const [ReviewDisplay, setReviewDisplay] = React.useState<{
    description: string;
    reviews: { id: string; user: string; comment: string }[];
  }>({ description: "", reviews: [] });

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
              setReviewDisplay={setReviewDisplay}
            />
          ))}
        </div>
        <div>
          {isReviewDisplay.some((r) => r.isReviewDisplay) &&
          ReviewDisplay.reviews.length > 0 ? (
            <ReviewsDisplay ReviewDisplay={ReviewDisplay} />
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

function ReviewsDisplay({
  ReviewDisplay,
}: {
  ReviewDisplay: {
    description: string;
    reviews: { id: string; user: string; comment: string }[];
  };
}) {
  const [reviewsState, setReviewsState] = React.useState(ReviewDisplay);

  useEffect(() => {
    setReviewsState(ReviewDisplay);
  }, [ReviewDisplay]);

  return (
    <>
      <p>Product Name: {reviewsState.description}</p>
      {reviewsState.reviews.map((r) => (
        <div key={r.id}>
          <p>User: {r.user}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </>
  );
}

export default ProductList;
