import type { Product } from "../../../../../../shared/types/frontend-product";

function ReviewsDisplay({
  id,
  allProducts,
}: {
  id: number;
  allProducts: Product[];
}) {
  const product: Product | undefined = allProducts.find((p) => p.id === id);

  return (
    <div className="review-display">
      <h4>Reviews</h4>
      {product && (
        <p className="product-name">Product Name: {product.description}</p>
      )}
      {product &&
        product.reviews?.map((r) => (
          <div key={r.id}>
            <p>User: {r.userName}</p>
            <p>{r.comment}</p>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default ReviewsDisplay;
