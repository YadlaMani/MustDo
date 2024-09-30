require("dotenv").config(); // Add this line at the top of the file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasks");
const connectDB = require("./config/database");

const app = express();
// middleware
const corsOptions = {
  origin: "https://mustdoo.netlify.app/",
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Remove this line:
// app.use("/api/todos", require("./routes/todos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
