import type { Product } from "../../../../../../shared/types/frontend-product";
import "./ProductList.css";
import React from "react";
import Drawer from "@/components/common/drawer/Drawer";
import ReviewFillForm from "./ReviewFillForm";
import ReviewsDisplay from "./ReviewsDisplay";

function ProductCard({
  product,
  allProducts,
  addReview,
  toggleWishedProduct,
}: {
  product: Product;
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
  // use the seed to generate random image, rather than use the original same image url in sample data
  const randomImgUrl = `${product.imgUrl}/seed/${product.id}/165`;

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState<"write" | "view">("view");

  const openWrite = () => {
    setDrawerMode("write");
    setDrawerOpen(true);
  };

  const openView = () => {
    setDrawerMode("view");
    setDrawerOpen(true);
  };

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
        <span className="cur-price">{`$${product.price.toFixed(2)}`}</span>
        {"  "}
        <span className="original-price">
          <del>{`Was $${product.originalPrice.toFixed(2)}`}</del>
        </span>
      </p>
      {product.reviews ? (
        <a
          onClick={() => {
            openView();
          }}
        >
          <p className="review-number">
            <strong>Reviews: </strong> <span>{product.reviews.length}</span>
          </p>
        </a>
      ) : null}
      <button
        onClick={() => {
          openWrite();
        }}
      >
        Write a review
      </button>
      <button
        onClick={() => {
          toggleWishedProduct(product.id);
        }}
      >
        {product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      </button>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerMode === "write" && (
          <ReviewFillForm
            id={product.id}
            description={product.description}
            addReview={addReview}
            closeDrawer={() => setDrawerOpen(false)}
          />
        )}
        {drawerMode === "view" && (
          <ReviewsDisplay id={product.id} allProducts={allProducts} />
        )}
      </Drawer>
    </div>
  );
}

export default ProductCard;
