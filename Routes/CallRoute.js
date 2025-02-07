const express = require("express");
const { saveCallHistory } = require("../Controller/Call");
const router = express.Router();

router.post("/save-call", saveCallHistory);

module.exports = router;
