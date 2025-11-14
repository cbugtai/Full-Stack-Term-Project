import { Request, Response, NextFunction } from "express";
import { Review } from "../../../../../../shared/types/frontend-product";
import * as reviewService from "../services/reviewService";
import { successResponse } from "../models/responseModel";

// assume userId is 1 for now, will implement auth later
const userId = 1;

export const getReviewsByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews: Review[] = await reviewService.getReviewsByProductId(
      Number.parseInt(req.params.id)
    );
    res
      .status(200)
      .json(successResponse(reviews, "Reviews retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newReview = await reviewService.createReview({ ...req.body, userId });
    res
      .status(201)
      .json(successResponse(newReview, "Review created succesfully"));
  } catch (error) {
    next(error);
  }
};
