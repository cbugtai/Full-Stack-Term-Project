import { Request, Response, NextFunction } from "express";
import { Product } from "../../../../../../shared/types/frontend-product";
import * as productService from "../services/productService";
import * as tempUserService from "../services/tempUserService";
import { successResponse } from "../models/responseModel";
import { Wishlist } from "@prisma/client";

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // temporary user handling,  will remove when auth is implemented
    const userId: number = await tempUserService.getTempUserId();

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
    // temporary user handling,  will remove when auth is implemented
    const userId: number = await tempUserService.getTempUserId();

    const wishlist: Product[] = await productService.getUserWishlist(userId);
    res
      .status(200)
      .json(successResponse(wishlist, "User's wishlist retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // temporary user handling,  will remove when auth is implemented
    const userId: number = await tempUserService.getTempUserId();

    const newTerm: Wishlist = await productService.addToWishlist({
      ...req.body,
      userId,
    });
    res
      .status(201)
      .json(successResponse(newTerm, "Add to wishlist succesfully"));
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // temporary user handling,  will remove when auth is implemented
    const userId: number = await tempUserService.getTempUserId();

    const count: Number = await productService.removeFromWishlist({
      ...req.body,
      userId,
    });
    res
      .status(201)
      .json(
        successResponse(
          null,
          count
            ? "Remove from wishlist succesfully"
            : "The product was not in the wishlist"
        )
      );
  } catch (error) {
    next(error);
  }
};
