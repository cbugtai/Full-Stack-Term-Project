import express from "express";
import * as listingController from "../controllers/listingController";
import { validateRequest } from "../middleware/validate";
import { createListingSchema, updateListingSchema } from "../validations/listingValidation";
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post(
    "/",
    upload.single("file"),
    validateRequest(createListingSchema),
    listingController.createListing
);

router.get("/:id", listingController.getListingById);

router.get("/seller/:sellerId/listings", listingController.getListingsBySeller);

router.put(
    "/:id",
    upload.single("file"),
    validateRequest(updateListingSchema),
    listingController.updateListing
);

router.delete("/:id", listingController.deleteListing);

export default router;