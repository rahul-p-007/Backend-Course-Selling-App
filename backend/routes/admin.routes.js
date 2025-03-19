const express = require("express")
const {z} = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const JWT_SECRET= "123Happy123"

const adminRouter = express.Router()
const { AdminModel}  = require("../db/Schema/Schema")




adminRouter.post("/signup",async(req,res)=>{

     try {
            
            const { email,firstName,lastName,password} = req.body
            
            const EmailCheck  = await AdminModel.findOne({email})
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
            const AdminValidationSchema = z.object({
                email : z.string().email(),
                firstName : z.string(),
                lastName : z.string(),
                password : passwordSchema
            })
        
            const AdminValidated = AdminValidationSchema.safeParse({email,firstName,lastName,password})
            if(!AdminValidated.success){
                    return res.status(400).json({ message: AdminValidated.error.issues[0].message })
            }
    
            //hash password
            const passwordHashed = await bcrypt.hash(password,5)
    
            await AdminModel.create({email,firstName,lastName,password : passwordHashed})
            return res.json({
                message : "User is successfully register"
            })
    
    
        } catch (error) {
            console.log(error.message)
        }
    
    
       
    
   
})

adminRouter.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
    
        const admin = await AdminModel.findOne({
            email : email,
        })
        if(!admin){
          return  res.status(403).json({
                message : "User does not exist"
            })
        }
    
        const passwordMatch = await bcrypt.compare(password,admin.password)
    
        if(passwordMatch){
            const token = jwt.sign({
                id : admin._id
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
