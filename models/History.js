import { Schema, model, models } from "mongoose";
const historySchema = new Schema({
  productIds: {
    type: Array,
    required: [true, "Please provide product ids or empty array"],
  },
  userId: {
    type: String,
    required: [true, "Please provide userId"],
  },
});

const History = models.History || model("History", historySchema);

export default History;
