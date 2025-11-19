import { useReviews } from "@/hooks/useReviews";
// import type { Review } from "../../../../../../shared/types/frontend-product";

function ReviewsDisplay({ id }: { id: number }) {
  const { reviews, error } = useReviews(id);
  const productName: string = reviews[0]?.productDescription;
  return (
    <div className="review-display">
      <h4>Reviews</h4>
      {productName && (
        <div className="product-name">Product Name: {productName}</div>
      )}
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {reviews?.map((r) => (
            <div key={r.id}>
              <p>User: {r.userName}</p>
              <p>{r.comment}</p>
              <p>{`Create at: ${new Date(r.createdAt)
                .toISOString()
                .slice(0, 16)
                .replace("T", " ")}`}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ReviewsDisplay;
