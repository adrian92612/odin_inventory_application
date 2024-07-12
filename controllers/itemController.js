import Item from "../models/item.js";
import asyncHandler from "express-async-handler";

export const index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "test" });
});
