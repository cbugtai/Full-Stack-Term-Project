import Joi from "joi";

export const createListingSchema = Joi.object({
    sellerId: Joi.number().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(2000).required(),
    brandId: Joi.number().required(),
    categoryId: Joi.number().required(),
    conditionId: Joi.number().required(),
    statusId: Joi.number().required(),
    price: Joi.number().min(0).required(),
    originalPrice: Joi.number().min(0).required(),
    city: Joi.string().required(),
    isNegotiable: Joi.boolean().required(),
    isFree: Joi.boolean().required(),
});

export const updateListingSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    originalPrice: Joi.number().optional(),
    categoryId: Joi.number().optional(),
    conditionId: Joi.number().optional(),
    brandId: Joi.number().optional(),
    statusId: Joi.number().optional(),
    city: Joi.string().optional(),
    isNegotiable: Joi.boolean().optional(),
    isFree: Joi.boolean().optional(),
}).required();