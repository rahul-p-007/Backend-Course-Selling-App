const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { z } = require("zod");
const { UserModel } = require("../db/Schema/user.Schema");

// 🔹 Password Schema
const PasswordSchemaValidation = z.string()
  .min(5, "Minimum 5 characters required")
  .max(15, "Maximum length should be less than 15")
  .regex(/[A-Z]/, "Should have at least one uppercase character")
  .regex(/[a-z]/, "Should have at least one lowercase character")
  .regex(/\d/, "Should have at least one number")
  .regex(/[@#$%^&*?]/, "Should have at least one special character");

// 🔹 Name Schema
const NameSchemaValidation = z.string()
  .min(5, "Minimum 5 characters required")
  .max(15, "Maximum length should be less than 15");

// 🔹 Signup Controller
const signup = async (req, res) => {
  try {
    console.log("🔵 Signup Request Received:", req.body);

    const { name, email, password } = req.body;

    // Validate Input
    const UserValidationSchema = z.object({
      name: NameSchemaValidation,
      email: z.string().email(),
      password: PasswordSchemaValidation
    });

    const UserValidated = UserValidationSchema.safeParse({ name, email, password });
    if (!UserValidated.success) {
      console.log("❌ Validation Error:", UserValidated.error.issues);
      return res.status(400).json({ message: UserValidated.error.issues[0].message });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Store in DB
    await UserModel.create({ email, name, password: hashedPassword });

    console.log("✅ User Created Successfully");
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return res.status(400).json({ message: "User already exists or something went wrong." });
  }
};

// 🔹 Other Controllers
const login = (req, res) => {
  res.json({ message: "Login functionality not implemented yet." });
};

const createCourse = (req, res) => {
  res.json({ message: "Create course functionality not implemented yet." });
};

const DeleteCourse = (req, res) => {
  res.json({ message: "You have cleaned up the code" });
};

const AddCourse = (req, res) => {
  res.json({ message: "You have cleaned up the code" });
};

const purchaseCourse = (req, res) => {
  res.json({ message: "Course purchased successfully!" });
};

const GetAllCourse = (req, res) => {
  res.json({ message: "List of all courses" });
};

// 🔹 Export Controllers
module.exports = {
  signup,
  login,
  createCourse,
  AddCourse,
  DeleteCourse,
  purchaseCourse,
  GetAllCourse
};
