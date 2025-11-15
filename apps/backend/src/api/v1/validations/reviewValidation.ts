import Joi, { ObjectSchema } from "joi";

// get review by product id schema: only allows product id as positive integer in params, no other data expected
export const getReviewsByProductIdSchema: ObjectSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
}).unknown(false);

// create review schema: expects productId as positive integer and comment as string between 10 and 200 characters in body
export const createReviewSchema: ObjectSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  comment: Joi.string().min(10).max(200).required(),
}).unknown(false);
