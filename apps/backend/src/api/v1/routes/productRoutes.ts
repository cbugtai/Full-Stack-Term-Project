import express, { Router } from "express";
import * as productController from "../controllers/productController";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get("/", productController.getAllProducts);
router.get("/wishlist", productController.getUserWishlist);

export default router;
