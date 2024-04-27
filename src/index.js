import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { complaintRouter } from "./routes/complaint.js";
import { adminRouter } from "./routes/login.js";
import { chatRouter } from "./routes/chat.js";
import { teachRouter } from "./routes/teachers.js";
import { assignRouter } from "./routes/assign.js";
import { stdRouter } from "./routes/student.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/UETComplaint");

app.use("/uetcomp", complaintRouter);
app.use("/admin", adminRouter);
app.use("/chatbot", chatRouter);
app.use("/teacher", teachRouter);
app.use("/task", assignRouter);
app.use("/student", stdRouter);

http: app.listen("3001", () => {
  console.log("Server Started");
});
