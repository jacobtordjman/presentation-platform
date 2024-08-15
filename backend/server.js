const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const presentationRoutes = require("./routes/presentationRoutes");
const slideRoutes = require("./routes/slideRoutes");
const dbConfig = require("./config/db");

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/presentations", presentationRoutes);
app.use("/api/slides", slideRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Presentation Platform API");
});

// Use DB URL from environment variables if available, otherwise fallback to dbConfig.url
const dbUrl = process.env.DB_URL || dbConfig.url;

// Database connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
