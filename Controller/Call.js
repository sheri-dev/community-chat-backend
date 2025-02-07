const Call = require("../Model/Call");

exports.saveCallHistory = async (req, res) => {
  try {
    const { caller, receiver, type, duration } = req.body;

    const newCall = new Call({ caller, receiver, type, duration });
    await newCall.save();

    res.status(201).json({ message: "Call history saved" });
  } catch (error) {
    res.status(500).json({ error: "Error saving call history" });
  }
};
