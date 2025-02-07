const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      minlength: 2,
      maxlength: 5,
    },
    lastMessage: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    pin: {
      type: String,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
