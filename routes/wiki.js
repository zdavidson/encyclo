const express = require("express");
const router = express.Router();
const { addPage, main } = require("../views");
const { Page } = require("../models");

// GET /wiki/
router.get("/", (req, res) => {
  res.send(main());
});

// POST /wiki/
router.post("/", async (req, res, next) => {
  try {
    // title, content, status
    // Model.create combines build & save
    const page = await Page.create(req.body);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// GET /wiki/add
router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
