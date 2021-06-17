const express = require("express");
const router = express.Router();
const { userList, userPages } = require("../views");
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
    });
    const pages = await Page.findAll({
      where: { authorId: req.params.id },
    });

    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
