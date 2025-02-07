const chatModel = require("../Model/Chat");
const userModel = require("../Model/user");
const bcrypt = require("bcryptjs");

exports.createChat = async (req, res) => {
  try {
    const { participants, lastMessage } = req.body;
    const users = await userModel.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
      return res.status(400).json({ message: "Some users not found " });
    }
    const chat = new chatModel({ participants, lastMessage });
    await chat.save();
    res.status(200).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await chatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat updated successfully", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await chatModel.findByIdAndDelete(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({
      message: "Chat deleted successfully",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllChat = async (req, res) => {
  try {
    const chats = await chatModel.find().populate("participants", "name email");
    res.status(200).json({
      message: "Get all chats successfully",
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await chatModel
      .findById(id)
      .populate("participants", "name email");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    const userId = req.user.id;
    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    res.status(200).json({ message: "Get chat by id successfully", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.setChatPin = async (req, res) => {
  try {
    const { chatId, pin } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);
    await Chat.findByIdAndUpdate(chatId, { pin: hashedPin });
    res.status(200).json({
      message: "Chat pin set successfully ",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.verifyChatPin = async (req, res) => {
  try {
    const { chatId, pin } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat || !chat.pin) {
      return res.status(404).json({ message: "Pin not set " });
    }
    const isMatch = await bcrypt.compare(pin, chat.pin);

    if (!isMatch) {
      res.status(400).json({
        message: "Incorect Pin ",
      });
    }
    res.status(200).json({
      message: "Pin verified successfully ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
