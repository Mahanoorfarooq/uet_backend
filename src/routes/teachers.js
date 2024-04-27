import express from "express";
import { AssignModel } from "../models/Assign.js";
import { TeacherModel } from "../models/Teachers.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const jwtkey = "u_et";

router.post('/signup', async(req,res)=>{
    const {name, email, password} = req.body
    const exEmail = await TeacherModel.findOne({email})
    if (exEmail){
        res.json("Email already exists!")
    }
    try{
        const newTeacher = new TeacherModel({ name, email, password });
        await newTeacher.save()
        res.json("Registration Successfull!")

    } catch(err){
        console.log(err)
    }

})



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingTeacher = await TeacherModel.findOne({ email });
    if (!existingTeacher) {
      return res.status(404).json("You are not registered!");
    }

    if (existingTeacher.password !== password) {
      return res.status(401).json("Password Incorrect");
    }

    const tasks = await AssignModel.find({
      teachName: { $regex: new RegExp(existingTeacher.name, "i") },
    }).populate("complaint"); 

    if (tasks.length === 0) {
      return res.status(404).json("No tasks assigned");
    }

    const complaints = tasks.map((task) => task.complaint);

      const token = jwt.sign({ email: existingTeacher.email }, jwtkey, {
        expiresIn: "4d",
      });

      res.cookie("token", token);
      console.log(token)

      res.status(200).json({
        message: "Success",
        name: existingTeacher.name,
        email: existingTeacher.email,
        complaints: complaints,
      });
   

  } catch (error) {
     console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



export {router as teachRouter}