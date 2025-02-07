const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "location", "voice"],
      required: true,
    },
    mediaURL: {
      type: String,
    },
    chatId: {
      // Added reference to Chat model
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    voiceURL: {
      type: String, // ✅ Store voice file URL
    },
  },
  {
    timestamps: true,
  }
);
const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
