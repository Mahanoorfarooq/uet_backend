import express from "express";
import { StudentModel } from "../models/Student.js";
import jwt from "jsonwebtoken";
import { ComplaintModel } from "../models/Complaint.js";
import { AdminModel } from "../models/Response.js";

const router = express.Router();

const jwtkey = "u_et";

router.post("/signup", async (req, res) => {
  const { name, reg_no, email, password } = req.body;
  const exEmail = await StudentModel.findOne({ reg_no });
  if (exEmail) {
    res.json("Email already exists!");
  }
  try {
    const newStd = new StudentModel({ name, reg_no, email, password });
    await newStd.save();
    res.json("Registration Successfull!");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { reg_no, email, password } = req.body;

  try {
    const existingStd = await StudentModel.findOne({ reg_no });
    const stdcomp = await ComplaintModel.find({reg_no})
    const stdresp = await AdminModel.find({ reg_no });
    if (!existingStd) {
      return res.status(404).json("You are not registered!");
    }

    if (existingStd.password !== password) {
      return res.status(401).json("Password Incorrect");
    }

    const token = jwt.sign({ email: existingStd.email }, jwtkey, {
      expiresIn: "4d",
    });

    res.cookie("token", token);
    console.log(token);

    res.status(200).json({
      message: "Success",
      name: existingStd.name,
      reg_no: existingStd.reg_no,
      email: existingStd.email,
      complaints: stdcomp, 
      responses: stdresp,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as stdRouter };
