import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { findOrCreateUser } from "../middleware/findOrCreateUser";
import * as sellerController from "../controllers/sellerController";
import { validateRequest } from "../middleware/validate";
import { sellerIdSchema, idSchema, sellerCreateSchema } from "../validations/sellerValidation";

const router: Router = Router();

router.get(
    "/",
    findOrCreateUser,
    sellerController.getAllSellers
)

router.get(
    "/:id",
    findOrCreateUser,
    validateRequest(idSchema),
    sellerController.getSellerById
)

router.post(
    "/",
    requireAuth(),
    findOrCreateUser,
    validateRequest(sellerCreateSchema),
    sellerController.addSeller
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

router.get(
    "/me",
    requireAuth(),
    findOrCreateUser,
    sellerController.getSellerByUserId
);

export default router;