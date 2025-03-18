const express = require("express");
const {z} = require("zod");
const bcrypt = require("bcrypt")

const { UserModel } = require("../db/Schema/Schema");
const UserRouter = express.Router();

// User Routes
UserRouter.post("/signup", async (req,res)=>{
    try {
        
        const { email,firstName,lastName,password} = req.body
        
        const EmailCheck  = await UserModel.findOne({email})
        if(EmailCheck){
            return res.status(400).json({
                message : "Email already exists"
            })
        } 

        //Vaildation of input data
        const passwordSchema = z.string()
        .min(5,"Minimum 5 character")
        .max(15,"Maximum 15 character")
        .regex(/[A-Z]/,"Include atleast one uppercase in the password")
        .regex(/[a-z]/,"Include atleast one lowercase in the password")
        .regex(/\d/, "Should have at least one number")
        .regex(/[@#$%^&*?]/, "Should have at least one special character");
        const UserValidationSchema = z.object({
            email : z.string().email(),
            firstName : z.string(),
            lastName : z.string(),
            password : passwordSchema
        })
    
        const UserValidated = UserValidationSchema.safeParse({email,firstName,lastName,password})
        if(!UserValidated.success){
                return res.status(400).json({ message: UserValidated.error.issues[0].message })
        }

        //hash password
        const passwordHashed = await bcrypt.hash(password,5)

        await UserModel.create({email,firstName,lastName,password : passwordHashed})
        return res.json({
            message : "User is successfully register"
        })


    } catch (error) {
        console.log(error.message)
    }


   


   
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