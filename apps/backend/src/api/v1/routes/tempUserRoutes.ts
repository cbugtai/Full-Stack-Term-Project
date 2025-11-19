import express, { Router } from "express";
import * as tempUserController from "../controllers/tempUserController";

const router: Router = express.Router();

// define method that will be invoked when route gets a request
router.get("/", tempUserController.getTempUserId);

export default router;
