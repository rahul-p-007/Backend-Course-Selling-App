const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://rahul8159977131:uFjfLfKUOZr12VOw@cluster0.sxla1.mongodb.net/todo-rahul-3");

const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");

const app = express();
app.use(express.json());
env.config();

// Routes
app.use("/user", userRouter);


// Start Server
app.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
