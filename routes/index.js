import express from "express";
import * as item_controller from "../controllers/itemController.js";
const router = express.Router();

/* GET home page. */
router.get("/", item_controller.index);

export default router;
