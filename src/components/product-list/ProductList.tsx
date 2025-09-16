import type { JSX } from "react";
import { products } from "./sample-data/sample-data";
import type { Product } from "./sample-data/sample-data";
import "./ProductList.css";

function ProductList() {
  const productList: JSX.Element[] = [];
  // use the list of products to generate a list of product cards
  products.forEach((p, i) =>
    productList.push(<ProductCard product={p} key={i} />)
  );

  return (
    <>
      <section className="product-list">
        <h2>Featured Products</h2>
        <div className="product-list-gallery">{productList}</div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  // use the seed to generate random image, rather than use the original same image url in sample data
  const randomImgUrl = `https://picsum.photos/seed/${Math.random()}/165`;

  return (
    <div className="product-card">
      <img
        src={randomImgUrl}
        alt="product image"
        // to make sure could load every img
        style={{ width: "165px", height: "165px" }}
        onError={(e) => {
          // assert the target type
          const target = e.target as HTMLImageElement;
          target.src = randomImgUrl;
        }}
      />
      <div className="product-desc">{product.description}</div>
      <div className="product-brand">
        <strong>Brand:</strong>
        {` ${product.brand}`}
      </div>
      <div className="product-condition">
        <strong>Condition: </strong>
        {`${product.condition}`}
      </div>
      <div>
        <span className="cur-price">{`$${product.currentPrice.toFixed(
          2
        )}`}</span>
        {"  "}
        <span className="original-price">
          <del>{`Was $${product.originalPrice.toFixed(2)}`}</del>
        </span>
      </div>
    </div>
  );
}

export default ProductList;
