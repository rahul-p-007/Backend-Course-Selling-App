const express = require("express");
const userMiddleware = require("../middleware/user.auth");
const { PurchaseModel, CourseModel } = require("../db/Schema/Schema");
CourseRouter = express.Router()

CourseRouter.post("/purchase", userMiddleware, async (req, res) => {
    try {
      const userId = req.userId;
      const courseId = req.body.courseId;  
  
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }
  
      // Validate if course exists
      const courseExists = await CourseModel.findById(courseId);
      if (!courseExists) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Prevent duplicate purchases
      const existingPurchase = await PurchaseModel.findOne({ userId, courseId });
      if (existingPurchase) {
        return res.status(400).json({ message: "You have already purchased this course" });
      }
  
      await PurchaseModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        courseId: new mongoose.Types.ObjectId(courseId)
      });
  
      res.json({
        message: "You have successfully purchased the course"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
CourseRouter.get("/preview",async (req,res)=>{
    const courses = await CourseModel.find({})
    res.json({
        courses
    })
});

module.exports = CourseRouter;
