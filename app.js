const express = require("express");
const app = express();
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

// Layouts
const views = require("./views");

// Middleware
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

// Database
db.authenticate().then(() => console.log("Connected to the database"));

// Main Route
app.get("/", async (req, res, err) => {
  try {
    res.redirect("/wiki");
  } catch (err) {
    next(err);
  }
});

// Error Handling
app.use((req, res, next) => {
  res.status(404).send(views.notFoundPage());
});

const init = async () => {
  await db.sync();
  await Page.sync();
  await User.sync();

  app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
};

init();
