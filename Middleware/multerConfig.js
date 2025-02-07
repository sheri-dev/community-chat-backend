const multer = require("multer");
const path = require("path");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // This is the directory to store your files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid filename clashes
  },
});

const upload = multer({ storage });

module.exports = upload;
