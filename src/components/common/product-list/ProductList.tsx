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

function ReviewFillForm({
  id,
  description,
  updateProducts,
}: {
  id: number;
  description: string;
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [comment, setComment] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  return (
    <form
      className="review-fill-form"
      onSubmit={(e) => {
        e.preventDefault();
        // validate
        if (comment.length <= 10) {
          setIsValid(false);
          return;
        }

        // update the reivew
        updateProducts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  reviews: [
                    ...(p.reviews ?? []),
                    { user: "Anonymous User", comment: comment },
                  ],
                }
              : p
          )
        );
      }}
    >
      <input type="text" value={description} />
      <textarea
        placeholder="Your Review"
        rows={4}
        cols={50}
        value={comment}
        onChange={(e) => {
          setIsValid(true);
          setComment(e.target.value);
        }}
        required
      ></textarea>
      {!isValid ? (
        <p className="validation-error">
          Review must be more than 10 characters.
        </p>
      ) : null}
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ProductList;
