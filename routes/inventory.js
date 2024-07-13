import express from "express";
import * as item_controller from "../controllers/itemController.js";
import * as category_controller from "../controllers/categoryController.js";

const router = express.Router();

// home page
router.get("/", item_controller.index);

// item list page
router.get("/items", item_controller.itemList);

// item details page
router.get("/items/:id", item_controller.itemDetails);

export default router;
