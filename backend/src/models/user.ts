import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  credit: { type: Number, default: 0, required: true },
  unused_spins: { type: Number, default: 0, required: true },
});

export const User = model<InferSchemaType<typeof userSchema>>(
  "User",
  userSchema
);
