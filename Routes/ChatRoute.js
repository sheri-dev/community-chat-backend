const express = require("express");
const {
  createChat,
  updateChat,
  deleteChat,
  getAllChat,
  getChatById,
} = require("../Controller/Chat");

const chatRouter = express.Router();

chatRouter.post("/", createChat);
chatRouter.put("/:id", updateChat);
chatRouter.delete("/:id", deleteChat);
chatRouter.get("/", getAllChat);
chatRouter.get("/:id", getChatById);

module.exports = chatRouter;
