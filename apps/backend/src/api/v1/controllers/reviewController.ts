import { Request, Response, NextFunction } from "express";
import { Review } from "../../../../../../shared/types/frontend-product";
import * as reviewService from "../services/reviewService";
import * as tempUserService from "../services/tempUserService";
import { successResponse } from "../models/responseModel";

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
    // temporary user handling,  will remove when auth is implemented
    const userId: number = await tempUserService.getTempUserId();

    const newReview = await reviewService.createReview({ ...req.body, userId });
    res
      .status(201)
      .json(successResponse(newReview, "Review created succesfully"));
  } catch (error) {
    next(error);
  }
};
