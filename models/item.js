import mongoose from "mongoose";

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
  supplier: {
    type: String,
    required: false,
  },
  dateAdded: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

export default mongoose.model("Item", ItemSchema);
