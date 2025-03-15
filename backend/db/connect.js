const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // Add this line to suppress the warning

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose;