const mongoose = require("mongoose");

const callSchema = mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["audio", "video"], required: true },
    duration: { type: Number }, // in seconds
  },
  { timestamps: true }
);

module.exports = mongoose.model("Call", callSchema);
