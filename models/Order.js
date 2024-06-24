import { Schema, model, models } from "mongoose";
const orderSchema = new Schema({
  products: {
    type: Object,
    required: [true, "Please provide product ids or empty array"],
  },
  orderPlacedDate: {
    type: Object,
    required:true
  },
  deliveredDate: {
    type: Object,
    required: true
  },
  delivered: {
    type: Boolean,
    required:true
  },
  total: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: [true, "Please provide userId"],
  },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
