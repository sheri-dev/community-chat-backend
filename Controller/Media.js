const mediaModel = require("../Model/Media");
const chatModel = require("../Model/Chat");

exports.createMedia = async (req, res) => {
  try {
    const { fileType, size, uploadBy, chatId, messageId } = req.body;
    const fileURL = req.file ? req.file.path : ""; // Multer stores the file in req.file

    const chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.participants.includes(uploadBy)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const media = new mediaModel({
      fileURL,
      fileType,
      size,
      uploadBy,
      chatId,
    });

    await media.save();
    res.status(200).json({ message: "Media uploaded successfully", media });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await mediaModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Media updated successfully", media });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await mediaModel.findByIdAndDelete(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
exports.getAllMedia = async (req, res) => {
  try {
    const media = await mediaModel.find().populate("chatId", "participants");
    res.status(200).json({
      message: "Get all media successfully",
      media,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
exports.getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await mediaModel
      .findById(id)
      .populate("chatId", "participants");
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Get media by id successfully", media });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};
