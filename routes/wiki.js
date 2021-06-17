const express = require("express");
const router = express.Router();
const { addPage, main } = require("../views");

// GET /wiki/
router.get("/", (req, res) => {
  res.send(main());
});

// POST /wiki/
router.post("/", (req, res) => {
  res.json(req.body);
});

// GET /wiki/add
router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
