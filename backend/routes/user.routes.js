const express = require("express")
const UserController = require("../controller/user.controller")



const UserRouter = express.Router()


// users

UserRouter.post("/signup",UserController.signup)
UserRouter.post("/login",UserController.login)
UserRouter.post("/purchare-course",UserController.purchaseCourse)
UserRouter.get("/course",UserController.GetAllCourse)

module.exports = UserRouter

