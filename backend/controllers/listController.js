const List = require("../models/listModel");
const mongoose = require("mongoose");

//GET full list
const getFullList = async (req, res) => {
  const list = await List.find({}).sort({ createdAt: -1 });
  res.status(200).json(list);
};

// GET list item
const getListItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const listItem = await List.findById(id);
  if (!listItem) {
    res.status(404).json({ error: "No such item" });
  }
  res.status(200).json(listItem);
};

// CREATE list item
const createListItem = async (req, res) => {
  const { id, option, include, style } = req.body;

  // add to database
  try {
    const list = await List.create({ id, option, include, style });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE list item
const deleteListItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const listItem = await List.findOneAndDelete({ _id: id });
  if (!listItem) {
    res.status(404).json({ error: "No such item" });
  }
  res.status(200).json(listItem);
};

//UPDATE list item
const updateListItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }
  const listItem = await List.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!listItem) {
    res.status(404).json({ error: "No such item" });
  }
  res.status(200).json(listItem);
};

module.exports = {
  createListItem,
  getFullList,
  getListItem,
  deleteListItem,
  updateListItem,
};
