const express = require("express");
const upload = require("../Middleware/multerConfig"); // Import the multer config
const {
  createMedia,
  updateMedia,
  deleteMedia,
  getAllMedia,
  getMediaById,
} = require("../Controller/Media");

const mediaRouter = express.Router();

// Use the '/upload' route for file upload and the 'file' field in form-data
mediaRouter.post("/upload", upload.single("file"), createMedia);

// Other media routes
mediaRouter.put("/:id", updateMedia);
mediaRouter.delete("/:id", deleteMedia);
mediaRouter.get("/", getAllMedia);
mediaRouter.get("/:id", getMediaById);

module.exports = mediaRouter;
