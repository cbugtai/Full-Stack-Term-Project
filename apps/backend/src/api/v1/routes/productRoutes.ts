import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as productController from "../controllers/productController";
import { validateRequest } from "../middleware/validate";
import {
  getProductSchema,
  getProductByIdSchema,
  getWishlistSchema,
  addWishlistSchema,
  removeWishlistSchema,
} from "../validations/productValidation";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get(
  "/",
  findOrCreateUser,
  validateRequest(getProductSchema),
  productController.getAllProducts
);

router.get(
  "/wishlist",
  requireAuth(),
  findOrCreateUser,
  validateRequest(getWishlistSchema),
  productController.getUserWishlist
);

router.post(
  "/wishlist",
  requireAuth(),
  findOrCreateUser,
  validateRequest(addWishlistSchema),
  productController.addToWishlist
);

router.delete(
  "/wishlist",
  requireAuth(),
  findOrCreateUser,
  validateRequest(removeWishlistSchema),
  productController.removeFromWishlist
);

router.get(
  "/:id",
  findOrCreateUser,
  validateRequest(getProductByIdSchema),
  productController.getProductById
);

export default router;
