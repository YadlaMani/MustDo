const mongoose = require("mongoose");
require("dotenv").config(); // Add this line

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI); // Add this line for debugging
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
