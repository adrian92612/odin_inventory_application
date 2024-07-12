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

CategorySchema.virtual("url", function () {
  return `/category/${this._id}`;
});

export default mongoose.model("Category", CategorySchema);
