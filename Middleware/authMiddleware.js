const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and contains the Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user from the decoded token to the request
      req.user = await User.findById(decoded.id).select("-password"); // Excluding password for security

      // Call the next middleware
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized, admin only" });
  }
};
module.exports = { protect, admin };
