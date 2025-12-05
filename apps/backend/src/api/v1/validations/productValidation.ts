import Joi, { ObjectSchema } from "joi";

// define the schema for getProduct request validation, no parameters expected in params or query or body
export const getProductSchema: ObjectSchema = Joi.object({
  page: Joi.number().integer().positive().optional(),
  pageSize: Joi.number().integer().positive().optional(),
}).unknown(false);

export const getProductByIdSchema: ObjectSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
}).unknown(false);

export const getWishlistSchema: ObjectSchema = Joi.object({
  page: Joi.number().integer().positive().optional(),
  pageSize: Joi.number().integer().positive().optional(),
}).unknown(false);

export const addWishlistSchema: ObjectSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
}).unknown(false);

export const removeWishlistSchema: ObjectSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
}).unknown(false);
