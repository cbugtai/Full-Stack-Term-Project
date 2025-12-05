import type { ProductListParams } from "@/types/productModel";
import { SignedOut } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductList({
  allProducts,
  addReview,
  toggleWishedProduct,
}: ProductListParams) {
  // this userid will be replaced with real user auth in future

  return (
    <>
      <section className="product-list">
        <SignedOut>
          {/* renders when user is signed out. Directs to clerk-provided sign-in page */}
          <NavLink to="/sign-in">
            <button className={"sign-in-prompt-btn"}>
              Sign in to add a review or wishlist
            </button>
          </NavLink>
        </SignedOut>
        <div className="product-list-gallery">
          {" "}
          {allProducts.map((p) => (
            <ProductCard
              product={p}
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
