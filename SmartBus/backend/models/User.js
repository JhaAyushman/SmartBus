import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: false, default: null },
  gender: { type: String, required: false, default: null },
  dob: { type: Date, required: false }
});

const User = model("user", UserSchema);

export default User;
