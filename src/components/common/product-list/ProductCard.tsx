import type { Product } from "./sample-data/sample-data";
import "./ProductList.css";
import React from "react";

function ProductCard({
  product,
  updateProducts,
  isReview,
  setIsReview,
  setProductId,
  setDescription,
}: {
  product: Product;
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isReview: { id: number; isReview: boolean }[];
  setIsReview: React.Dispatch<
    React.SetStateAction<{ id: number; isReview: boolean }[]>
  >;
  setProductId: React.Dispatch<React.SetStateAction<number>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  // use the seed to generate random image, rather than use the original same image url in sample data
  const randomImgUrl = `${product.imgUrl}/seed/${product.id}/165`;

  return (
    <div className="product-card">
      <img
        src={randomImgUrl}
        alt={product.description}
        className="product-img"
      />

      <p className="product-desc">
        {product.isWishlisted ? <span>❤️</span> : null}
        {product.description}
      </p>
      <p className="product-brand">
        <strong>Brand:</strong>
        {` ${product.brand}`}
      </p>
      <p className="product-condition">
        <strong>Condition: </strong>
        {`${product.condition}`}
      </p>
      <p>
        <span className="cur-price">{`$${product.currentPrice.toFixed(
          2
        )}`}</span>
        {"  "}
        <span className="original-price">
          <del>{`Was $${product.originalPrice.toFixed(2)}`}</del>
        </span>
      </p>
      {product.reviews ? (
        <p>
          <strong>Reviews: </strong>{" "}
          <span className="review-number">{product.reviews.length}</span>
        </p>
      ) : null}
      <button
        onClick={() => {
          setIsReview((pre) =>
            pre.map((p) =>
              p.id === product.id
                ? { id: product.id, isReview: !p.isReview }
                : { id: product.id, isReview: true }
            )
          );
          setProductId(product.id);
          setDescription(product.description);
        }}
      >
        {isReview.find((item) => item.id === product.id)?.isReview
          ? "Cancel Review"
          : "Write a review"}
      </button>
      <button
        onClick={() => {
          updateProducts((prev) =>
            prev.map((p) =>
              p.id === product.id
                ? { ...p, isWishlisted: !product.isWishlisted }
                : p
            )
          );
        }}
      >
        {product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}

export default ProductCard;
