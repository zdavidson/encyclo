const express = require("express");
const router = express.Router();
const { addPage } = require("../views");

// GET /wiki/
router.get("/", (req, res) => {
  res.send("main page");
});

// POST /wiki/

router.post("/", (req, res) => {
  res.send("main page (post)");
});

// GET /wiki/add
router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
