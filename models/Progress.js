import { Decimal } from "@prisma/client/runtime/library";
import { Schema, model, models } from "mongoose";
const progressSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  progressValue: {
    type: Number,
    required: true,
  }
});

const Progress = models.Progress || model("Progress", progressSchema);

export default Progress;
