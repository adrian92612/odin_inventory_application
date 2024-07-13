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
});

CategorySchema.virtual("url").get(function () {
  return `/inventory/category/${this._id}`;
});

export default mongoose.model("Category", CategorySchema);
