const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
} = require("../Controller/User"); // Destructured import for the controllers
const { protect } = require("../Middleware/authMiddleware");

const userRouter = express.Router();

// Route to create a user
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, getUserProfile); // Protected route
userRouter.put("/update/:id", updateUser); // Protected route
userRouter.delete("/delete/:id", deleteUser); // Protected route
userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserById);

module.exports = userRouter;
