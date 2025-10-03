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
    <>
      <p>Product Name: {reviewsState.description}</p>
      {reviewsState.reviews.map((r) => (
        <div key={r.id}>
          <p>User: {r.user}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </>
  );
}

export default ReviewsDisplay;
