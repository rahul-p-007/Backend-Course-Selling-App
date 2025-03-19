const express = require("express");
const {z} = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET




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
UserRouter.post("/login", async(req,res)=>{
try {
    const {email,password} = req.body

    const user = await UserModel.findOne({
        email : email,
    })
    if(!user){
      return  res.status(403).json({
            message : "User does not exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(passwordMatch){
        const token = jwt.sign({
            id : user._id
        },JWT_SECRET)
       return res.json({
            token : token
        })
    }else{
        res.status(403).json({
            message : "Incorrect credentails"
        })
    }
} catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Internal Server Error"
    });
}

    
  
});


UserRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "All Purchases"
    })
});


module.exports = UserRouter;