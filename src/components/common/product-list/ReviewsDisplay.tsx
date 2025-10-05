import type { Product } from "./sample-data/sample-data";

function ReviewsDisplay({ id, products }: { id: number; products: Product[] }) {
  const product: Product | undefined = products.find((p) => p.id === id);

  return (
    <div className="review-display">
      <h4>Reviews</h4>
      {product && (
        <p className="product-name">Product Name: {product.description}</p>
      )}
      {product &&
        product.reviews?.map((r) => (
          <div key={r.id}>
            <p>User: {r.user}</p>
            <p>{r.comment}</p>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default ReviewsDisplay;
