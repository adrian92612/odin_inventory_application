import Item from "../models/item.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";
import { formatPrice } from "../Helpers/helpers.js";

export const index = asyncHandler(async (req, res, next) => {
  //- should provide the following information:
  //- Inventory Summary: number of items, number of categories, total stock value
  //- Category Summary: number of items in each category
  //- Stock Levels: low and out of stock items
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

  res.render("index", { title: "Home", overviewData });
});
