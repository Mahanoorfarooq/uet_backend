import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { AdminId, password } = req.body;
  if (AdminId == "admin123" && password == "admin") {
    res.json({
      message: "success",
    });
  } else {
    res.json("Wrong Password or AdminId!");
  }
});

export { router as adminRouter };

