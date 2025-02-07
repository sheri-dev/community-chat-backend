const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  fileURL: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  messageId: {
    // Added reference to Message model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

const mediaModel = mongoose.model("Media", mediaSchema);

module.exports = mediaModel;
