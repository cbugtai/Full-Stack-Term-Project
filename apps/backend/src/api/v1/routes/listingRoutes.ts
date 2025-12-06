import express from "express";
import * as listingController from "../controllers/listingController";
import { validateRequest } from "../middleware/validate";
import { createListingSchema, updateListingSchema } from "../validations/listingValidation";
import multer from "multer";
import { requireAuth } from "@clerk/express";

const upload = multer();
const router = express.Router();

router.post(
    "/",
    requireAuth(),
    upload.single("file"),
    validateRequest(createListingSchema),
    listingController.createListing
);

router.get(
    "/seller/:sellerId",
    requireAuth(),
    listingController.getListingsBySeller
);

router.get(
    "/:id",
    listingController.getListingById
);

router.put(
    "/:id",
    requireAuth(),
    upload.single("file"),
    validateRequest(updateListingSchema),
    listingController.updateListing
);

router.delete(
    "/:id",
    requireAuth(),
    listingController.deleteListing
);

export default router;