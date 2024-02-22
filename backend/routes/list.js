const express = require("express");
const {
  createListItem,
  getFullList,
  getListItem,
  deleteListItem,
  updateListItem,
} = require('../controllers/listController')

const router = express.Router();

// GET full list
router.get("/", getFullList);

// GET single list item
router.get("/:id", getListItem);

//POST new list item
router.post("/", createListItem);

//DELETE new list item
router.delete("/:id", deleteListItem);

//UPDATE new list item
router.patch("/:id", updateListItem);

module.exports = router;
