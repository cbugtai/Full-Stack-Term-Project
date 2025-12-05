import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import * as sellerController from "../controllers/sellerController";
import { validateRequest } from "../middleware/validate";
import { sellerIdSchema, idSchema } from "../validations/sellerValidation";

const router: Router = Router();

router.get(
    "/",
    sellerController.getAllSellers
)

router.get(
    "/:id",
    validateRequest(idSchema),
    sellerController.getSellerById
)

router.post(
    "/favorite",
    requireAuth(),
    findOrCreateUser,
    validateRequest(sellerIdSchema),
    sellerController.addFavoriteSeller
)

router.delete(
    "/favorite",
    requireAuth(),
    findOrCreateUser,
    validateRequest(sellerIdSchema),
    sellerController.removeFavoriteSeller
)

router.post(
    "/blocked",
    requireAuth(),
    findOrCreateUser,
    validateRequest(sellerIdSchema),
    sellerController.addBlockedSeller
)

router.delete(
    "/blocked",
    requireAuth(),
    findOrCreateUser,
    validateRequest(sellerIdSchema),
    sellerController.removeBlockedSeller
)

export default router;