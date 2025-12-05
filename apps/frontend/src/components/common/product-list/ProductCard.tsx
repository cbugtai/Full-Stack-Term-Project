import "./ProductList.css";
import React from "react";
import Drawer from "@/components/common/drawer/Drawer";
import ReviewFillForm from "./ReviewFillForm";
import ReviewsDisplay from "./ReviewsDisplay";
import type { ProductCardParams } from "@/types/productModel";
import { SignedIn } from "@clerk/clerk-react";

function ProductCard({
  product,
  addReview,
  toggleWishedProduct,
}: ProductCardParams) {
  let productImgUrl = product.imgUrl;

  if (product.imgUrl.includes("picsum.photos")) {
    // if the image is random image, to generate random image, rather than use the original same image url
    productImgUrl = `${product.imgUrl}/seed/${product.id}/165`;
  }

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
        src={productImgUrl}
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
            {product.reviews.length === 0 || !product.reviews ? null : (
              <>
                {" "}
                <strong>Reviews: </strong> <span>{product.reviews.length}</span>
              </>
            )}
          </p>
        </a>
      ) : null}

      <SignedIn>
        {" "}
        <button
          onClick={() => {
            openWrite();
          }}
          // add the validation to hidden the button if the user has already written a review for this product
          hidden={product.hasReviewed}
        >
          Write a review
        </button>{" "}
      </SignedIn>
      <SignedIn>
        {" "}
        <button
          onClick={() => {
            toggleWishedProduct(product.id);
          }}
        >
          {product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>{" "}
      </SignedIn>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerMode === "write" && (
          <ReviewFillForm
            id={product.id}
            description={product.description}
            addReview={addReview}
            closeDrawer={() => setDrawerOpen(false)}
          />
        )}
        {drawerMode === "view" && <ReviewsDisplay id={product.id} />}
      </Drawer>
    </div>
  );
}

export default ProductCard;
