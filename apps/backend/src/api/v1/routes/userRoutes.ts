import express from "express";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/user", findOrCreateUser, userController.getUser);
router.put("/user", findOrCreateUser, userController.updateUser);
router.delete("/user", findOrCreateUser, userController.deleteUser);

export default router;