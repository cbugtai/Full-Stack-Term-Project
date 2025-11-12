import React from "react";
import type { ReviewOnProduct } from "@/types/productModel";

function ReviewFillForm({
  id,
  description,
  closeDrawer,
  addReview,
}: {
  id: number;
  description: string;
  addReview: ({ productId, comment }: ReviewOnProduct) => void;
  closeDrawer: () => void;
}) {
  const [comment, setComment] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const [willClose, setWillClose] = React.useState(false);

  return (
    <div>
      <h4>Fill Comment</h4>
      <form
        className="review-fill-form"
        onSubmit={(e) => {
          e.preventDefault();
          // validate
          if (comment.length <= 10) {
            setIsValid(false);
            return;
          }

          // update the reivew
          addReview({ productId: id, comment: comment });
          // show success message
          setWillClose(true);

          setTimeout(() => {
            // close the drawer after 800 ms
            closeDrawer();
          }, 800);
        }}
      >
        <label>{`Product Name: ${description}`}</label>
        <textarea
          placeholder="Your Comment"
          rows={4}
          cols={50}
          value={comment}
          onChange={(e) => {
            setIsValid(true);
            setComment(e.target.value);
          }}
          required
        ></textarea>
        {!isValid ? (
          <p className="validation-error">
            Review must be more than 10 characters.
          </p>
        ) : null}
        {willClose && <p>Review submitted successfully.</p>}
        <button disabled={willClose} type="submit">
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default ReviewFillForm;
