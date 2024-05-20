const express = require("express");
const router = express.Router();
const { getSearch } = require("../controller/SearchController");

router.get("/", getSearch);

module.exports = router;
