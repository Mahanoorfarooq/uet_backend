import express from "express";
import { AssignModel } from "../models/Assign.js";
import { ComplaintModel } from "../models/Complaint.js";

const router = express.Router();

router.post("/assign/:userId", async (req, res) => {
  const { userId } = req.params;
  const { teachName, message, complaint } = req.body; 
  try {

    const { status, ...complaintDataWithoutStatus } = complaint;

    const foundComplaint = await ComplaintModel.findOne({ userId });
    if (!foundComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    const { reg_no } = foundComplaint;

    const newAssign = new AssignModel({
      teachName: teachName,
      userId: userId,
      message: message,
      complaint: complaintDataWithoutStatus, 
    });

    await newAssign.save();

    res.status(200).json({ message: "Complaint assigned successfully" });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.put("/assignStatus/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
   
//     const assignment = await AssignModel.findOne({ userId });


//     if (!assignment) {
//       return res.status(404).json({ error: "Assignment not found" });
//     }

//     assignment.complaint.status = "Clear";

//     await assignment.save();

//     return res.status(200).json({ message: "Status updated successfully" });
//   } catch (error) {
//     console.error("Error updating status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });




export { router as assignRouter };
