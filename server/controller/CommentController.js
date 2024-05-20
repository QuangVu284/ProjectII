const Comment = require("../model/comments");

const getCommentByid = async (req, res) => {
  try {
    const comment = await Comment.find({
      videoId: req.params.id,
      isDeleted: false,
    })
      .populate({
        path: "userId",
        select: ["email", "firstName", "lastName", "avatar"],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCountComments = async (req, res) => {
  try {
    const counts = await Comment.countDocuments({
      videoId: req.params.id,
      isDeleted: false,
    });
    res.status(200).json({
      success: true,
      counts: counts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const postComment = async (req, res) => {
  try {
    const comment = new Comment({
      userId: req.body.userId, // Lấy thông tin người dùng từ request body
      videoId: req.body.videoId,
      content: req.body.content,
    });
    await comment.save();
    res.status(200).json({
      success: true,
      message: "Bình luận thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  const { content } = req.body;
  try {
    await Comment.findByIdAndUpdate(
      req.params.id,
      { content, isEdited: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Đã xoá thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const countDeleteComment = async (req, res) => {
  try {
    const deletedCount = await Comment.countDocuments({
      videoId: req.params.id,
      isDeleted: true,
    });
    res.status(200).json({
      success: true,
      counts: deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCommentByid,
  getCountComments,
  postComment,
  deleteComment,
  updateComment,
  countDeleteComment,
};
