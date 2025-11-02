const express = require("express");
const cors = require("cors");
const config = require("./utils/config")
const { connectToDatabase } = require("./models/User");

const app = express();

// Middleware
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON bodies

// Connect to MongoDB
connectToDatabase(config.MONGODB_URI);

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Server is running and connected to DB, dawg!" });
});

module.exports = app;
