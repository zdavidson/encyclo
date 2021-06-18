const express = require("express");
const router = express.Router();
const { addPage, editPage, main, notFoundPage, wikiPage } = require("../views");
const { Page, User, Tag } = require("../models");

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
    // author, title, content, tags, status
    // Model.create combines build & save
    const page = await Page.create(req.body);

    const [user, wasCreated] = await User.findOrCreate({
      where: { name: req.body.author, email: req.body.email },
    });

    await page.setAuthor(user);

    // Adding Tags
    const tagList = req.body.tags.split(" ");
    const tags = await Promise.all(
      tagList.map(async (tagName) => {
        const [tag, wasCreated] = await Tag.findOrCreate({
          where: {
            name: tagName,
          },
        });
        return tag;
      })
    );

    await page.addTags(tags);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

// GET /wiki/add
router.get("/add", (req, res) => {
  res.send(addPage());
});

// GET /wiki/search/
router.get("/search", async (req, res, next) => {
  try {
    const pages = await Page.findByTag(req.query.search);

    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

// GET /wiki/:slug/edit -- EDIT PAGE
router.get("/:slug/edit", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Tag }, { model: User, as: "author" }],
    });

    res.send(editPage(page, page.author));
  } catch (err) {
    next(err);
  }
});

// PUT /wiki/:slug -- EDIT/UPDATE
router.put("/:slug", async (req, res, next) => {
  try {
    const page = await Page.update({
      where: { slug: req.params.slug },
      include: [{ model: User, as: "author" }],
    });

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

// DELETE /wiki/:slug

router.delete("/:slug", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// GET /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Tag }, { model: User, as: "author" }],
    });

    // if (page === null) {
    //   return res.send(notFoundPage());
    // }

    res.send(wikiPage(page, page.author));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
