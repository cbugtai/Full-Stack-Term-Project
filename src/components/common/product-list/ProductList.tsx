import type { JSX } from "react";
import type { Product } from "./sample-data/sample-data";
import "./ProductList.css";

function ProductList({
  products,
  updateProducts,
}: {
  products: Product[];
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const productList: JSX.Element[] = [];
  // use the list of products to generate a list of product cards
  products.forEach((p) =>
    productList.push(
      <ProductCard product={p} key={p.id} updateProducts={updateProducts} />
    )
  );

  return (
    <>
      <section className="product-list">
        <div className="product-list-gallery">{productList}</div>
      </section>
    </>
  );
}

function ProductCard({
  product,
  updateProducts,
}: {
  product: Product;
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
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

export default ProductList;
