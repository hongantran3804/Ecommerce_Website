import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  photo: {
    type: String,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  prodDesc: {
    type: String,
    required: [true, "Please provide product description"],
  },
  upc: {
    type: String,
    required: [true, "Please provide product upc"],
  },
  casePrice: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  unitPerCase: {
    type: Number,
    required: [true, "Please provide case"],
  },
  numInStock: {
    type: Number,
    required: true
  },
  numPurchased: {
    type: Number,
    required: [true, "Please provide number of customer for this product"],
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
