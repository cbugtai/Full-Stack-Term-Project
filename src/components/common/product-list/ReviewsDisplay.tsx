import React, { useEffect } from "react";

function ReviewsDisplay({
  ReviewDisplay,
}: {
  ReviewDisplay: {
    description: string;
    reviews: { id: string; user: string; comment: string }[];
  };
}) {
  const [reviewsState, setReviewsState] = React.useState(ReviewDisplay);

  useEffect(() => {
    setReviewsState(ReviewDisplay);
  }, [ReviewDisplay]);

  return (
    <div className="review-display">
      <h4>Reviews</h4>
      <p className="product-name">Product Name: {reviewsState.description}</p>
      {reviewsState.reviews.map((r) => (
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
