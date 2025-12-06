import type { Review } from "../../../../shared/types/frontend-product";
import * as reviewRepo from "../apis/product/reviewRepo";

export async function fetchReviewByProductId(
  productId: number,
  sessionToken?: string | null
) {
  const reviews: Review[] = await reviewRepo.fetchReviewByProductId(
    productId,
    sessionToken
  );
  return reviews;
}

export async function addReview({
  sessionToken,
  productId,
  comment,
}: {
  sessionToken: string;
  productId: number;
  comment: string;
}) {
  const reviews: Review[] = await reviewRepo.addReview({
    sessionToken,
    productId,
    comment,
  });
  return reviews;
}

export function validateComment(comment: string): {
  isValid: boolean;
  errors: string[];
} {
  let isValid = true;
  const errors: string[] = [];

  if (comment.trim().length < 10) {
    isValid = false;
    errors.push("Review must be more than 10 characters.");
  } else if (comment.trim().length > 200) {
    isValid = false;
    errors.push("Review must be less than 200 characters.");
  }

  return { isValid, errors };
}
