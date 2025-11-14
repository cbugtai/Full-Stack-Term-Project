import express, { Router } from "express";
import * as productController from "../controllers/productController";
import { validateRequest } from "../middleware/validate";
import {
  getProductSchema,
  getWishlistSchema,
  addWishlistSchema,
  removeWishlistSchema,
} from "../validations/productValidation";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get(
  "/",
  validateRequest(getProductSchema),
  productController.getAllProducts
);
router.get(
  "/wishlist",
  validateRequest(getWishlistSchema),
  productController.getUserWishlist
);

router.post(
  "/wishlist",
  validateRequest(addWishlistSchema),
  productController.addToWishlist
);

router.delete(
  "/wishlist",
  validateRequest(removeWishlistSchema),
  productController.removeFromWishlist
);

export default router;
