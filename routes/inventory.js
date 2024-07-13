import express from "express";
import * as item_controller from "../controllers/itemController.js";
import * as category_controller from "../controllers/categoryController.js";

const router = express.Router();

// home page
router.get("/", item_controller.index);

// item list page
router.get("/items", item_controller.itemList);

router
  .route("/item/create")
  .get(item_controller.itemCreate_get)
  .post(item_controller.itemCreate_post);

router
  .route("/item/:id/update")
  .get(item_controller.itemUpdate_get)
  .post(item_controller.itemUpdate_post);

router
  .route("/item/:id/delete")
  .get(item_controller.itemDelete_get)
  .post(item_controller.itemDelete_post);

router.get("/item/:id", item_controller.itemDetails);

export default router;
