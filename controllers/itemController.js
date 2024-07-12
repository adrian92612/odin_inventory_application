import Item from "../models/item.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";

export const index = asyncHandler(async (req, res, next) => {
  const items = await Item.find({}, "name").exec();
  console.log(items);
  res.render("index", { title: "test" });
});
