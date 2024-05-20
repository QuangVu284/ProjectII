const List = require("../model/listModel");

const watch = async (req, res) => {
  try {
    const watchVideo = await List.findOne({ slug: req.params.slug }).then(
      (watchVideo) => res.json(watchVideo)
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { watch };
