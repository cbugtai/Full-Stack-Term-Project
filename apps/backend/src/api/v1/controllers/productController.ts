import { Request, Response, NextFunction } from "express";
import {
  Product,
  ProductsRes,
} from "../../../../../../shared/types/frontend-product";
import * as productService from "../services/productService";
import { successResponse } from "../models/responseModel";
import { Wishlist } from "@prisma/client";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // check if userId is available in the request
    let userId: number | undefined;
    if (!req.userId) {
      userId = undefined;
    } else {
      userId = req.userId;
    }
    // console.log("userId in getAllProducts:", userId);

    // get the page and pageSize from query parameters
    const page: number = Number.parseInt(req.query.page as string) || 1;
    let pageSize: number = Number.parseInt(req.query.pageSize as string) || 12;
    if (pageSize > 20) {
      pageSize = 20; // set a maximum page size limit
    }
    const productRes: ProductsRes | undefined =
      await productService.fetchAllProducts(userId, page, pageSize);
    res
      .status(200)
      .json(successResponse(productRes, "Products retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // check if userId is available in the request
    let userId: number | undefined;
    if (!req.userId) {
      userId = undefined;
    } else {
      userId = req.userId;
    }

    const product: Product | null = await productService.fetchProductById(
      userId,
      Number.parseInt(req.params.id)
    );
    if (product) {
      res
        .status(200)
        .json(successResponse(product, "product retrieved succesfully"));
    }
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // check if userId is available in the request
    if (!req.userId) {
      throw new Error("User not found");
    }

    const userId: number = req.userId;

    // get the page and pageSize from query parameters
    const page: number = Number.parseInt(req.query.page as string) || 1;
    let pageSize: number = Number.parseInt(req.query.pageSize as string) || 6;
    if (pageSize > 10) {
      pageSize = 10; // set a maximum page size limit
    }

    const wishlist: ProductsRes = await productService.getUserWishlist(
      userId,
      page,
      pageSize
    );
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
    // check if userId is available in the request
    if (!req.userId) {
      throw new Error("User not found");
    }

    const userId: number = req.userId;

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
    // check if userId is available in the request
    if (!req.userId) {
      throw new Error("User not found");
    }

    const userId: number = req.userId;

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
