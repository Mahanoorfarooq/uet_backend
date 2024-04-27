import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  reg_no: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

export const AdminModel = mongoose.model("admin", AdminSchema);
