import { Schema, model as _model } from "mongoose";

const User = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
  },
  { collection: "user-data" }
);

const model = _model("UserData", User);

export default model;