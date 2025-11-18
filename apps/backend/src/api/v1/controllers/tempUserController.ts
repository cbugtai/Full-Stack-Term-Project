import { Request, Response, NextFunction } from "express";
import * as tempUserService from "../services/tempUserService";
import { successResponse } from "../models/responseModel";

export const getTempUserId = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tempUserId: number = await tempUserService.getTempUserId();
    res
      .status(200)
      .json(successResponse(tempUserId, "tempUserId retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};
