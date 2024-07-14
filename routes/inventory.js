import express from "express";
import * as item_controller from "../controllers/itemController.js";
import * as category_controller from "../controllers/categoryController.js";

const router = express.Router();

// home page
router.get("/", item_controller.index);

// Item
// list
router.get("/items", item_controller.itemList);

// create
router
  .route("/item/create")
  .get(item_controller.itemCreate_get)
  .post(item_controller.itemCreate_post);

// update
router
  .route("/item/:id/update")
  .get(item_controller.itemUpdate_get)
  .post(item_controller.itemUpdate_post);

// delete
router
  .route("/item/:id/delete")
  .get(item_controller.itemDelete_get)
  .post(item_controller.itemDelete_post);

// details
router.get("/item/:id", item_controller.itemDetails);

// Category
// list
router.get("/categories", category_controller.categoryList);

// create
// update
// delete

// details
router.get("/category/:id", category_controller.categoryDetails);

export default router;
