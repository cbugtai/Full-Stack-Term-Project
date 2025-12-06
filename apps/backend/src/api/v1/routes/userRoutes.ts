import express from "express";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import * as userController from "../controllers/userController";
import { validateRequest } from "../middleware/validate";
import { updateUserSchema } from "../validations/userValidation";

const router = express.Router();

router.get("/", findOrCreateUser, userController.getUser);
router.put("/", findOrCreateUser, validateRequest(updateUserSchema), userController.updateUser);
router.delete("/", findOrCreateUser, userController.deleteUser);

export default router;
