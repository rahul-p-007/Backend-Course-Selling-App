require("dotenv").config()
const express = require("express");
const Server = require("./db/connect")


const userRouter = require("./routes/user.routes")
const courseRouter = require("./routes/course.routes")
const adminRouter = require("./routes/admin.routes")

const app = express();
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/course",courseRouter)
app.use("/admin",adminRouter)




Server(app)
