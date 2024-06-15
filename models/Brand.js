import { Schema, model, models } from "mongoose";
const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide brand name"]
  }
});

const Brand = models.Brand || model("Brand", brandSchema);

export default Brand;
