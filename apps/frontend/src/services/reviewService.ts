import type { Review } from "../../../../shared/types/frontend-product";
import * as reviewRepo from "../apis/product/reviewRepo";

export async function fetchReviewByProductId(productId: number) {
  const reviews: Review[] = await reviewRepo.fetchReviewByProductId(productId);
  return reviews;
}

export async function addReview({
  productId,
  comment,
}: {
  productId: number;
  comment: string;
}) {
  const reviews: Review[] = await reviewRepo.addReview({
    productId,
    comment,
  });
  return reviews;
}
