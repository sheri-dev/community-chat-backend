const User = require("../Model/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  if (user) {
    const token = user.generateToken();
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data ",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.matchPassword(password); // Use the instance method
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken(); // Generate token using instance method
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

module.exports = { registerUser, userLogin };
