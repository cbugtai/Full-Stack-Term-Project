import { useState, useEffect } from "react";
import * as reviewService from "../services/reviewService";
import type { Review } from "../../../../shared/types/frontend-product";

export function useReviews(productId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewsByProductId = async (productId: number) => {
    try {
      const result: Review[] = await reviewService.fetchReviewByProductId(
        productId
      );
      setReviews(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchReviewsByProductId(productId);
      } catch (errorObject) {
        setError(String(errorObject));
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    reviews,
    error,
  };
}

export function useComment() {
  const [comment, setComment] = useState<string>("");

  function tryValidateComment(): { isValid: boolean; errors: string[] } {
    const validation = reviewService.validateComment(comment);

    return validation;
  }

  return {
    comment,
    setComment,
    tryValidateComment,
  };
}
