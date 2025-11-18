import { Router } from "express"
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
    validateRequest(sellerIdSchema),
    sellerController.addFavoriteSeller
)

router.delete(
    "/favorite",
    validateRequest(sellerIdSchema),
    sellerController.removeFavoriteSeller
)

router.post(
    "/blocked",
    validateRequest(sellerIdSchema),
    sellerController.addBlockedSeller
)

router.delete(
    "/blocked",
    validateRequest(sellerIdSchema),
    sellerController.removeBlockedSeller
)

export default router;