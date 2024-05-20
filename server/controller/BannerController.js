const Banner = require("../model/banner");

const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBanner };
