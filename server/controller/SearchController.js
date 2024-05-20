const List = require("../model/listModel");

const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.json({
        success: false,
        message: "Vui lòng cung cấp từ khóa để tìm kiếm.",
      });
    }
    const video = await List.find({
      title: { $regex: keyword, $options: "i" },
    });

    res.json({ success: true, data: video });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra trong quá trình tìm kiếm.",
    });
  }
};

module.exports = { getSearch };
