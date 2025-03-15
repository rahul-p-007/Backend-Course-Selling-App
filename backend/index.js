// Modules
const express = require("express")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
const {z}  =  require("zod")
const bcrypt = require("bcrypt")

// In build Module
const userRouter = require("./routes/user.routes")
const adminRouter = require("./routes/admin.routes")
const db = require("./db/connect")


const app = express()
app.use(express.json())
env.config()





app.use("/user",userRouter)
app.use("/admin",userRouter)

app.listen(3000,()=>{
    console.log("🚀 Server is running on port 3000");
})