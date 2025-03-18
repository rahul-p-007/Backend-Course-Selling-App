const express = require("express")


const adminRouter = express.Router()
const {UserModel}  = require("../db/Schema/Schema")
adminRouter.post("/login",(req,res)=>{
    res.json({
        message : "You Login"
    })
})
adminRouter.post("/signup",(req,res)=>{
    res.json({
        message : "You Signup"
    })
})


adminRouter.post("/course",(req,res)=>{
    res.json({
        message : "You Create Course"
    })
})
adminRouter.put("/course",(req,res)=>{
    res.json({
        message : "Admin delete the course"
    })
})
adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message : "You Login"
    })
})

module.exports = adminRouter;
