const express = require("express");

const {
  createMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} = require("../Controller/Message");

const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.put("/:id", updateMessage);
messageRouter.delete("/:id", deleteMessage);
messageRouter.get("/", getAllMessages);
messageRouter.get("/:id", getMessageById);

module.exports = messageRouter;
