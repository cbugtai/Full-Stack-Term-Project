import { useComment } from "@/hooks/useComment";
import React from "react";

function ReviewFillForm({
  id,
  description,
  closeDrawer,
  addReview,
}: {
  id: number;
  description: string;
  addReview: ({
    productId,
    comment,
  }: {
    productId: number;
    comment: string;
  }) => void;
  closeDrawer: () => void;
}) {
  const { comment, setComment, tryValidateComment } = useComment();
  const [willClose, setWillClose] = React.useState(false);

  return (
    <div>
      <h4>Fill Comment</h4>
      <form
        className="review-fill-form"
        onSubmit={(e) => {
          e.preventDefault();
          // validate the comment length
          if (!tryValidateComment().isValid) {
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
            setComment(e.target.value);
          }}
          required
        ></textarea>
        {!tryValidateComment().isValid && comment.length > 0 ? (
          <p className="validation-error">
            {tryValidateComment().errors.map((err, idx) => (
              <span key={idx}>{err}</span>
            ))}
          </p>
        ) : null}
        {willClose && <p>Review submitted successfully.</p>}
        <button
          disabled={willClose || !tryValidateComment().isValid}
          type="submit"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}

export default ReviewFillForm;
