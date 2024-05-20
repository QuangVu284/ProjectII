const express = require("express");
const router = express.Router();
const { watch } = require("../controller/WatchController");

router.get("/:slug", watch);

module.exports = router;
