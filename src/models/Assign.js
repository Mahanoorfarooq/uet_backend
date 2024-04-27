import mongoose from "mongoose";


const AssignSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  complaint: {
    type: {
      reg_no: String,
      department: String,
      nature: String,
      compmsg: String,
      status: String, 
    },
    required: true,
  },
  teachName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const AssignModel = mongoose.model("assign", AssignSchema);
