import { Schema, model, models } from "mongoose";
const shoppingSchema = new Schema({
  product: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const ShoppingCart = models.ShoppingCart || model("ShoppingCart", shoppingSchema);

export default ShoppingCart;
