const express = require("express");
const router = express.Router();
const { addPage, main, wikiPage } = require("../views");
const { Page } = require("../models");

// GET /wiki/
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

// POST /wiki/
router.post("/", async (req, res, next) => {
  try {
    // author, title, content, status
    // Model.create combines build & save
    const page = await Page.create(req.body);
    res.redirect(`/wiki/${page.slug}`);
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
    if (page === null) {
      res.json("That page was not found!");
    }
    res.send(wikiPage(page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
