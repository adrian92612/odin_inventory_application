import Item from "../models/item.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";
import { formatPrice } from "../Helpers/helpers.js";
import { body, validationResult } from "express-validator";

// Display Home/Overview Page
export const index = asyncHandler(async (req, res, next) => {
  /* 
    should provide the following information:
    Inventory Summary: number of items, number of categories, total stock value
    Category Summary: number of items in each category
    Stock Levels: low and out of stock items 
  */
  const [items, categories] = await Promise.all([
    Item.find().populate("category").exec(),
    Category.find().exec(),
  ]);

  const totalItems = items.length;
  const totalCategories = categories.length;
  const totalStockValue = items.reduce((total, item) => total + item.price * item.numberInStock, 0);
  const lowStockItems = items.filter((item) => item.numberInStock < 10);
  const outOfStockItems = items.filter((item) => item.numberInStock === 0);
  const mostValuableItems = items.sort((a, b) => b.price - a.price).slice(0, 3);

  const overviewData = {
    totalItems,
    totalCategories,
    totalStockValue: formatPrice(totalStockValue),
    categories: categories.map((category) => ({
      name: category.name,
      itemCount: items.filter((item) => item.category._id.equals(category._id)).length,
    })),
    lowStockItems,
    outOfStockItems,
    mostValuableItems,
  };

  res.render("index", { title: "Inventory Overview", overviewData });
});

// Display List of all Items
export const itemList = asyncHandler(async (req, res, next) => {
  const items = await Item.find().populate("category").exec();
  res.render(`item_list`, {
    title: `Item List`,
    items,
  });
});

export const itemDetails = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate(`category`).exec();

  if (!item) {
    const error = new Error(`Item not found`);
    error.status = 404;
    return next(error);
  }

  res.render(`item_details`, {
    title: `Item Details`,
    item,
  });
});

export const itemCreate_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().sort({ name: 1 }).exec();
  console.log(categories);
  res.render(`item_form`, {
    title: `Add an Item`,
    categories,
  });
});

export const itemCreate_post = [
  // validate and sanitize fields
  body(`name`, `Name must be specified`).trim().isLength({ min: 1 }).escape(),
  body(`description`, `Description must be provided`).trim().isLength({ min: 1 }).escape(),
  body(`supplier`).trim().escape(),

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render(`item_form`, {
        title: `Add Item`,
        item: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const newItem = await Item.create(req.body);
      res.redirect(newItem.url);
    }
  }),
];

export const itemUpdate_get = asyncHandler(async (req, res, next) => {
  const [item, categories] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render(`item_form`, {
    title: `Update Item`,
    item,
    categories,
  });
});

export const itemUpdate_post = [
  // validate and sanitize fields
  body(`name`, `Name must be specified`).trim().isLength({ min: 1 }).escape(),
  body(`description`, `Description must be provided`).trim().isLength({ min: 1 }).escape(),
  body(`supplier`).trim().escape(),

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      res.render(`item_form`, {
        title: `Update Item`,
        item: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect(updatedItem.url);
    }
  }),
];

export const itemDelete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  res.render(`item_delete`, {
    title: `Delete ${item.name}?`,
    item,
  });
});

export const itemDelete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid).exec();
  res.redirect(`/inventory/items`);
});
