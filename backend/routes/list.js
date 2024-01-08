const express = require("express");
const List = require("../models/listModel");

const router = express.Router();

// GET list
router.get("/", (req, res) => {
  res.json({ msg: "GET list" });
});

// GET single list item
router.get("/:id", (req, res) => {
  res.json({ msg: "GET single list item" });
});




//POST new list item
router.post("/", async (req, res) => {

  const { id, option, include, style } = req.body;

  try {
    const list = await List.create({ id, option, include, style });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




//DELETE new list item
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE new list item" });
});

//UPDATE new list item
router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE a list item" });
});

module.exports = router;
