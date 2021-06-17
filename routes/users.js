const express = require("express");
const router = express.Router();
const { userList, userPages, notFoundPage } = require("../views");
const { Page, User } = require("../models");

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Page }],
    });

    if (user === null) {
      return res.send(notFoundPage());
    }

    // const pages = await Page.findAll({
    //   where: { authorId: req.params.id },
    // });

    res.send(userPages(user, user.pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
