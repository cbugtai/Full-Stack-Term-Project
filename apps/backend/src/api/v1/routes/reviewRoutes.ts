import express, { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import {
  getReviewsByProductIdSchema,
  createReviewSchema,
} from "../validations/reviewValidation";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get(
  "product/:id",
  validateRequest(getReviewsByProductIdSchema),
  reviewController.getReviewsByProductId
);
router.post(
  "/",
  validateRequest(createReviewSchema),
  reviewController.createReview
);

export default router;
