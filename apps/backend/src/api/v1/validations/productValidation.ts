import Joi, { ObjectSchema } from "joi";

// define the schema for getProduct request validation, no parameters expected in params or query or body
export const getProductSchema: ObjectSchema = Joi.object({}).unknown(false);

export const getWishlistSchema: ObjectSchema = Joi.object({}).unknown(false);
