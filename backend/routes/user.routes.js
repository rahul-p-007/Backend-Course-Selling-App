const express = require("express");

const UserRouter = express.Router();

// User Routes
UserRouter.post("/signup", (req,res)=>{
    res.json({
        message: "Signup Routes"
    })
});
UserRouter.post("/login", (req,res)=>{
    res.json({
        message: "login Routes"
    })
});

UserRouter.post("/course/purchase", (req,res)=>{
    res.json({
        message: "Course Purchases"
    })
});
UserRouter.get("/courses", (req,res)=>{
    res.json({
        message: " courses"
    })
});
UserRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "All Purchases"
    })
});


module.exports = UserRouter;
