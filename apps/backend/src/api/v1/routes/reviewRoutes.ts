import express, { Router } from "express";
import * as reviewController from "../controllers/reviewController";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get("/:id", reviewController.getReviewsByProductId);
router.post("/", reviewController.createReview);

export default router;
