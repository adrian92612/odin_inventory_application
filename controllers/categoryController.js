import Item from "../models/item.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { render } from "pug";

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

export const categoryCreate_get = (req, res, next) =>
  res.render(`category_form`, { title: `Add Category` });

export const categoryCreate_post = [
  // validate and sanitize
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be specified").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render(`category_form`, {
        title: `Add Category`,
        category: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const newCategory = await Category.create(req.body);
      res.redirect(newCategory.url);
    }
  }),
];

export const categoryUpdate_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id, "name description").exec();
  console.log(req.body);

  res.render(`category_form`, {
    title: `Update Category`,
    category,
  });
});

export const categoryUpdate_post = [
  // validate and sanitize
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be specified").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render(`category_form`, {
        title: `Add Category`,
        category: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { ...req.body, dateModified: new Date() },
        { new: true }
      );
      res.redirect(updatedCategory.url);
    }
  }),
];

export const categoryDelete_get = asyncHandler(async (req, res, next) => {
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
  res.render(`category_details`, {
    title: `Delete Category?`,
    category,
    toDelete: true,
  });
});

export const categoryDelete_post = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndDelete(req.body.categoryid).exec();
  res.redirect("/inventory/categories");
});
