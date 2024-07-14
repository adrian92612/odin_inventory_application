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
  dateAdded: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.virtual("url").get(function () {
  return `/inventory/category/${this._id}`;
});

export default mongoose.model("Category", CategorySchema);
