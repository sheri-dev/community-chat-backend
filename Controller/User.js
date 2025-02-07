const userModel = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, profilePicture, status } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword, // Store hashed password
      profilePicture,
      status,
    });
    await user.save();
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Userlogged in successfully",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User updates successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "Get all users successfully",
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "Get user by id successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error ", error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};
