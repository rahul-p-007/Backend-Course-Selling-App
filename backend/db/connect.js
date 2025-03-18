const mongoose = require("mongoose")
require("dotenv").config(); // Load .env variables

// Start Server
const Server = async (app)=>{
    try {
        await mongoose.connect(`mongodb+srv://rahulp00rtx:${process.env.MONGO_PASSWORD}@cluster0.drwmo.mongodb.net/`)
        app.listen(3000)
        console.log("🚀 Server is running on port 3000");
    } catch (error) {
       console.log("Server is Not Connected ") 
    }

   
  }
  module.exports = Server