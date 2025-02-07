const express = require("express");

const repRouter = express.Router();

const { reportUser } = require("../Controller/Report");
const { protect } = require("../Middleware/authMiddleware"); // Middleware to verify JWT

// Route to report a user
repRouter.post("/report", protect, reportUser);

module.exports = repRouter;
