// this service is used for users to get the product listings
// not the service for the seller
// Use the listing type defined in prisma/schema.prisma
// initialize a prisma client if not already and use in queries here
import prisma from "../../../../prisma/client";
import { Review } from "../../../../../../shared/types/frontend-product";
import { ExtendedError } from "../middleware/errorHandler";

export const getReviewsByProductId = async (
  productId: number
): Promise<Review[]> => {
  const reviews = await prisma.reviews.findMany({
    where: { listingId: productId },
    include: {
      user: true, // need to get username
      listing: true, // need to get product description
    },
    orderBy: {
      createdAt: "desc", // order by most recently created reviews
    },
  });

  return reviews.map((r) => ({
    id: r.id,
    userId: r.userId,
    productId: r.id,
    productDescription: r.listing.description,
    userName: `${r.user.userName}`,
    comment: r.comment,
    createdAt: r.createdAt,
  }));
};

export const createReview = async (reviewData: {
  productId: number;
  userId: number;
  comment: string;
}): Promise<Review> => {
  // check if the user has already left a review for this product
  const existing = await prisma.reviews.findFirst({
    where: {
      listingId: reviewData.productId,
      userId: reviewData.userId,
    },
  });

  if (existing) {
    const err: ExtendedError = new Error("User already reviewed");
    err.code = "REVIEW_EXISTS";
    err.statusCode = 400;
    throw err;
  }

  // if not, create the review
  const newReview = await prisma.reviews.create({
    data: {
      listingId: reviewData.productId,
      userId: reviewData.userId,
      comment: reviewData.comment,
      createdAt: new Date(),
    },
    include: {
      user: true, // need to get username
      listing: true, // need to get product description
    },
  });

  // format to Review data
  return {
    id: newReview.id,
    userId: newReview.userId,
    productId: newReview.listingId,
    productDescription: newReview.listing.description,
    userName: `${newReview.user.userName}`,
    comment: newReview.comment,
    createdAt: newReview.createdAt,
  };
};
