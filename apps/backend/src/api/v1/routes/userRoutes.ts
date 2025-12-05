import express from "express";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import * as userController from "../controllers/userController";
import { validateRequest } from "../middleware/validate";
import { updateUserSchema } from "../validations/userValidation";

const router = express.Router();

router.get("/user", findOrCreateUser, userController.getUser);
router.put("/user", findOrCreateUser, validateRequest(updateUserSchema), userController.updateUser);
router.delete("/user", findOrCreateUser, userController.deleteUser);

export default router;
