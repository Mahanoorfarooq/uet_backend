import express from "express";
import { v4 as uuidv4 } from "uuid";
import { AssignModel } from "../models/Assign.js";
import { ComplaintModel } from "../models/Complaint.js";
import { AdminModel } from "../models/Response.js";
const router = express.Router();

router.post("/complaint", async (req, res) => {
  try {
    const { reg_no, department, nature, compmsg } = req.body;
    const exComp = await ComplaintModel.findOne({ reg_no });
    if (exComp) {
      return res.status(400).json("Your complaint is already registered!");
    }

    const newComp = new ComplaintModel({
      reg_no,
      department,
      nature,
      compmsg,
      userId: uuidv4(),
    });

    await newComp.save();
    return res.status(201).json({
      message: "User registered successfully",
      userId: newComp.userId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/complaint/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const complaint = await ComplaintModel.findOne({ userId });
    if (!complaint) {
      return res.status(404).json("Complaint not found for this user ID");
    }
    return res.status(200).json(complaint);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getcomplaints", async (req, res) => {
  try {
    const complaints = await ComplaintModel.find();
    return res.status(200).json(complaints);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// router.put("/respond/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const { response } = req.body;

//   try {
//     const complaint = await ComplaintModel.findOne({ userId });
//     if (!complaint) {
//       return res.status(404).json({ error: "Complaint not found" });
//     }

//     const { reg_no } = complaint;

//     await AdminModel.create({
//       response: response,
//       userId: userId,
//       reg_no: reg_no,
//     });

//     return res.status(200).json({ message: "Response sent successfully" });
//   } catch (error) {
//     console.error("Error responding to complaint:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });


router.put("/respond/:complaintId", async (req, res) => {

  const { complaintId } = req.params; 

  try {
    const complaint = await ComplaintModel.findById(complaintId); 
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    const { reg_no } = complaint;

    await AdminModel.create({
      response: req.body.response,
      userId: complaint.userId,
      reg_no: reg_no,
    });

    return res.status(200).json({ message: "Response sent successfully" });
  } catch (error) {
    console.error("Error responding to complaint:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.put("/updateStatus/:complaintId", async (req, res) => {
  const { complaintId } = req.params;

  try {
    const complaint = await ComplaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    complaint.status = "Clear";
    await complaint.save();

    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/response/:reg_no", async (req, res) => {
  try {
    const { reg_no } = req.params;
    const response = await AdminModel.findOne({ reg_no });
    const complaint = await ComplaintModel.findOne({ reg_no });
     
    if (!response) {
      return res
        .status(404)
        .json({ error: "Response not found" });
    }
    return res.status(200).json({ response, complaint });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;

export { router as complaintRouter };
