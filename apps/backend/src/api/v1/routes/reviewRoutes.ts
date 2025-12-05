import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as reviewController from "../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import {
  getReviewsByProductIdSchema,
  createReviewSchema,
} from "../validations/reviewValidation";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get(
  "/product/:id",
  findOrCreateUser,
  validateRequest(getReviewsByProductIdSchema),
  reviewController.getReviewsByProductId
);
router.post(
  "/",
  requireAuth(),
  findOrCreateUser,
  validateRequest(createReviewSchema),
  reviewController.createReview
);

export default router;
