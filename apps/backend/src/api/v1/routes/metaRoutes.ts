import express from "express";
import * as metaController from "../controllers/metaController";

const router = express.Router();

router.get("/brands", metaController.getBrands);
router.get("/categories", metaController.getCategories);
router.get("/statuses", metaController.getStatuses);
router.get("/conditions", metaController.getConditions);

export default router;