const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportType: {
    type: String,
    required: true,
    enum: ["Spam", "Abusive", "Inappropriate Content", "Other"], // Types of reports
  },
  description: {
    type: String,
    required: true, // Optional, for additional details about the report
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

const reportModel = mongoose.model("Repot", reportSchema);

module.exports = reportModel;
