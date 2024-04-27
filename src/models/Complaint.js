import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  reg_no: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  nature: {
    type: String,
    required: true,
  },

  compmsg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Clear"],
    default: "Pending",
  },
});

export const ComplaintModel = mongoose.model("complaint", ComplaintSchema);
