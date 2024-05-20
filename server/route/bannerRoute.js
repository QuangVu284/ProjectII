const express = require("express");
const router = express.Router();
const { getBanner } = require("../controller/BannerController");

router.get("/", getBanner);

module.exports = router;
