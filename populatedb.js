#! /usr/bin/env node

import Item from "./models/item.js";
import Category from "./models/category.js";
import mongoose from "mongoose";

// get arguments passed on command line
const userArgs = process.argv.slice(2);

const items = [];
const categories = [];

mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  try {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    await clearDB();
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

async function clearDB() {
  await Promise.all([Category.deleteMany({}), Item.deleteMany({})]);
  console.log("database cleared");
}

async function categoryCreate(index, name, description) {
  categories[index] = await Category.create({ name, description });
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, numberInStock) {
  items[index] = await Item.create({
    name,
    description,
    category,
    price,
    numberInStock,
  });
  console.log(`Added item: ${name}`);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    // Manicure Items
    itemCreate(
      0,
      "Nail Polish",
      "A vibrant red nail polish for a glossy finish.",
      categories[0],
      5.99,
      150
    ),
    itemCreate(1, "Cuticle Oil", "Nourishing oil for healthy cuticles.", categories[0], 7.99, 80),
    itemCreate(
      2,
      "Nail Art Stickers",
      "Assorted nail art stickers for creative designs.",
      categories[0],
      3.99,
      200
    ),

    // Pedicure Items
    itemCreate(
      3,
      "Foot Scrub",
      "Exfoliating foot scrub with natural ingredients.",
      categories[1],
      9.99,
      100
    ),
    itemCreate(4, "Foot Bath", "Relaxing foot bath with lavender scent.", categories[1], 12.99, 60),
    itemCreate(
      5,
      "Moisturizing Foot Cream",
      "Deep moisturizing cream for soft feet.",
      categories[1],
      8.99,
      90
    ),

    // Nail Extensions Items
    itemCreate(
      6,
      "Acrylic Powder",
      "High-quality acrylic powder for nail extensions.",
      categories[2],
      15.99,
      50
    ),
    itemCreate(
      7,
      "Gel Nail Kit",
      "Complete kit for gel nail extensions.",
      categories[2],
      25.99,
      40
    ),
    itemCreate(8, "Nail Tips", "Durable nail tips for extensions.", categories[2], 10.99, 120),
  ]);
}

async function createCategories() {
  console.log("Adding Categories");
  await Promise.all([
    categoryCreate(
      0,
      `Manicure`,
      `Products and tools for manicure treatments, including nail polishes, cuticle care, and nail art supplies.`
    ),
    categoryCreate(
      1,
      `Pedicure`,
      `Products and tools for pedicure treatments, including foot scrubs, foot baths, and moisturizers.`
    ),
    categoryCreate(
      2,
      `Nail Extensions`,
      `Products for creating and maintaining nail extensions, including acrylics, gels, and nail tips.`
    ),
  ]);
}
