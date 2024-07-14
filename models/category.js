import mongoose from "mongoose";
import { format } from "date-fns";

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

CategorySchema.virtual("dateAdded_formatted").get(function () {
  return format(this.dateAdded, "do MMMMMM yyyy p OO");
});

CategorySchema.virtual("dateModified_formatted").get(function () {
  return format(this.dateModified, "do MMMMMM yyyy p OO");
});

export default mongoose.model("Category", CategorySchema);
