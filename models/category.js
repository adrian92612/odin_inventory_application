import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

// CategorySchema.virtual("items", {
//   ref: "Item",
//   localField: "_id",
//   foreignField: "category",
// });

CategorySchema.virtual("url").get(function () {
  return `/inventory/category/${this._id}`;
});

export default mongoose.model("Category", CategorySchema);
