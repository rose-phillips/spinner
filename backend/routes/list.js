const express = require("express");

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
router.post("/", (req, res) => {
  res.json({ msg: "POST new list item" });
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
