import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

export default  UserModel = mongoose.model("user", User);
