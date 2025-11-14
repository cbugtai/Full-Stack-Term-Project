import { Request, Response, NextFunction } from "express";
import { Product } from "../../../../../../shared/types/frontend-product";
import * as productService from "../services/productService";
import { successResponse } from "../models/responseModel";

// assume userId is 1 for now, will implement auth later
const userId = 1;

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products: Product[] = await productService.fetchAllProducts(userId);
    res
      .status(200)
      .json(successResponse(products, "Products retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const wishlist: Product[] = await productService.getUserWishlist(userId);
    res
      .status(200)
      .json(successResponse(wishlist, "User's wishlist retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};
