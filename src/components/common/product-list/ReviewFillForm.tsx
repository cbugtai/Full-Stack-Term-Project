import type { Product } from "./sample-data/sample-data";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function ReviewFillForm({
  id,
  description,
  updateProducts,
}: {
  id: number;
  description: string;
  updateProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [comment, setComment] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  return (
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
        updateProducts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  reviews: [
                    ...(p.reviews ?? []),
                    { id: uuidv4(), user: "Anonymous User", comment: comment },
                  ],
                }
              : p
          )
        );
      }}
    >
      <input type="text" value={description} />
      <textarea
        placeholder="Your Review"
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
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewFillForm;
