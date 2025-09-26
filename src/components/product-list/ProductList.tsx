import type { JSX } from "react";
import { products } from "./sample-data/sample-data";
import type { Product } from "./sample-data/sample-data";
import "./ProductList.css";

function ProductList() {
  const productList: JSX.Element[] = [];
  // use the list of products to generate a list of product cards
  products.forEach((p) =>
    productList.push(<ProductCard product={p} key={p.id} />)
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
  const randomImgUrl = `${product.imgUrl}/seed/${product.id}/165`;

  return (
    <div className="product-card">
      <img
        src={randomImgUrl}
        alt={product.description}
        className="product-img"
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
