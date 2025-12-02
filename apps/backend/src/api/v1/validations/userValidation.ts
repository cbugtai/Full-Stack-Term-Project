import Joi from "joi";

export const updateUserSchema = Joi.object({
    email: Joi.string().email().optional(),
    userName: Joi.string().min(3).max(30).optional(),
    firstName: Joi.string().min(1).optional(),
    lastName: Joi.string().min(1).optional(),
    phone: Joi.string().pattern(/^[0-9]+$/).optional(),
    bio: Joi.string().max(500).optional(),
    profilePic: Joi.string().uri().optional(),
});