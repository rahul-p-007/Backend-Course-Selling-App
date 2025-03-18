const express = require("express")
CourseRouter = express.Router()


CourseRouter.post("/purchase", (req,res)=>{
    res.json({
        message: "Course Purchases"
    })
});
CourseRouter.get("/", (req,res)=>{
    res.json({
        message: " courses"
    })
});

module.exports = CourseRouter;
