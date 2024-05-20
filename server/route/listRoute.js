const express = require("express");
const router = express.Router();
const { getList, getListByCategory } = require("../controller/ListController");

router.get("/", getList);
router.get("/:category", getListByCategory);

module.exports = router;
