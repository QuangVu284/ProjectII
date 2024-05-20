const List = require("../model/listModel");

const getList = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const list = await List.find({ category });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getList, getListByCategory };
