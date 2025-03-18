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


UserRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "All Purchases"
    })
});


module.exports = UserRouter;
