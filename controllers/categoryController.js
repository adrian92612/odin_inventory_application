import Item from "../models/item.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

export const categoryList = asyncHandler(async (req, res, next) => {
  const categories = await Category.find()
    .collation({ locale: "en", strength: 2 })
    .sort({ name: 1 })
    .populate({
      path: "items",
      select: "name",
      options: {
        collation: { locale: "en", strength: 2 },
        sort: { name: 1 },
      },
    })
    .exec();

  console.log(categories);
  res.render(`category_list`, {
    title: `Category List`,
    categories,
  });
});

export const categoryDetails = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .populate({
      path: "items",
      select: "name",
      options: {
        collation: { locale: "en", strength: 2 },
        sort: { name: 1 },
      },
    })
    .exec();

  if (!category) {
    const errors = new Error(`Category not found`);
    errors.status = 404;
    return next(errors);
  }

  res.render("category_details", {
    title: `Category Details`,
    category,
  });
});
