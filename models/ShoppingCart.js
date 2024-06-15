import { Schema, model, models } from "mongoose";
const shoppingSchema = new Schema({
  products: {
    type: Array,
    required: [true, "Please provide product ids or empty array"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: [true, "Please provide userId"],
  },
});

const ShoppingCart = models.ShoppingCart || model("Shopping_Cart", shoppingSchema);

export default ShoppingCart;
