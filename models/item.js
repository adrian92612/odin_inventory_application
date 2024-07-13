import mongoose from "mongoose";
import { format } from "date-fns";
import { formatPrice } from "../Helpers/helpers.js";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/items/${this._id}`;
});

ItemSchema.virtual("formattedPrice").get(function () {
  return formatPrice(this.price);
});

ItemSchema.virtual("dateAdded_formatted").get(function () {
  return format(this.dateAdded, "do MMMMMM yyyy p OO");
});

export default mongoose.model("Item", ItemSchema);
