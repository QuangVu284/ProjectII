const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  updateUserAvatar,
  uploadAvatar,
} = require("../controller/AuthController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Tạo thư mục uploads nếu chưa tồn tại
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/signup", signup, login);
router.put("/update-avatar", updateUserAvatar);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
