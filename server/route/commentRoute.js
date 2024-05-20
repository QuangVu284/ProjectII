const express = require("express");
const router = express.Router();
const {
  getCommentByid,
  getCountComments,
  postComment,
  updateComment,
  deleteComment,
  countDeleteComment,
} = require("../controller/CommentController");

router.get("/get-comment/:id", getCommentByid);

router.get("/get-count-comment/:id", getCountComments);

router.get("/get-count-deleted-comment/:id", countDeleteComment);

router.post("/post-comment", postComment);

router.put("/update-comment/:id", updateComment);

router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
