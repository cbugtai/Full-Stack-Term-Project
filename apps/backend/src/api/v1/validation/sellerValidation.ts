import Joi, { ObjectSchema } from "joi";

// Shared schema for any route that has :sellerId
export const sellerIdSchema: ObjectSchema = Joi.object({
  sellerId: Joi.number().integer().positive().required(),
}).unknown(false);

export const idSchema: ObjectSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
}).unknown(false);
