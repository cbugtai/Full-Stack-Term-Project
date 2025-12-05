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
    imageUrl: Joi.string().uri().optional(),
});

export const updateListingSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(2000).optional(),
    brandId: Joi.number().optional(),
    categoryId: Joi.number().optional(),
    conditionId: Joi.number().optional(),
    statusId: Joi.number().optional(),
    price: Joi.number().min(0).optional(),
    originalPrice: Joi.number().min(0).optional(),
    city: Joi.string().optional(),
    isNegotiable: Joi.boolean().optional(),
    isFree: Joi.boolean().optional(),
    imageUrl: Joi.string().uri().optional(),
}).min(1);