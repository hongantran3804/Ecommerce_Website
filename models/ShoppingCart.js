import { Schema, model, models } from "mongoose";
const shoppingSchema = new Schema({
  product: {
    type: Object,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: [true, "Please provide userId"],
  },
});

const ShoppingCart = models.ShoppingCart || model("ShoppingCart", shoppingSchema);

export default ShoppingCart;
