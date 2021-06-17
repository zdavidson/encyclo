const express = require("express");
const router = express.Router();
const { addPage, main, wikiPage } = require("../views");
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

// GET /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.json(page);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
