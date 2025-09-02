import { InferSchemaType, model, Schema } from "mongoose";

const spinSchema = new Schema({
  amount: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Spins = model<InferSchemaType<typeof spinSchema>>(
  "Spin",
  spinSchema
);
