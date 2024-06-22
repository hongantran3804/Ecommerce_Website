import { Schema, model, models } from "mongoose";
const addressSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    required: true,
  }
});

const Address = models.Address || model("Address", addressSchema);

export default Address;
