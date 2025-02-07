const messageModel = require("../Model/Message");
const chatModel = require("../Model/Chat");

exports.createMessage = async (req, res) => {
  try {
    const { content, sender, recipient, type, chatId, voiceURL } = req.body();
    const chat = await chatModel.findById(chatId);
    if (!chat || !chat.participants.includes(sender)) {
      return res.status(400).json({ message: "Chat not found " });
    }
    const message = new messageModel({
      content,
      sender,
      caption,
      recipient,
      type: "voice",
      voiceURL,
      mediaURL,
      chatId,
    });
    await message.save();
    res.status(200).json({
      message: "Message create successfully",
      message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!message) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Message updated successfully", message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({
      message: "Message deleted successfully",
      message,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find()
      .populate("chatId", "participants")
      .populate("sender", "name email");
    res.status(200).json({
      message: "Get all messages successfully",
      messages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel
      .findById(id)
      .populate("chatId", "participants")
      .populate("sender", "name email");
    if (!message) return res.status(404).json({ message: "Message not found" });
    res
      .status(200)
      .json({ message: "Get message by id successfully", message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
