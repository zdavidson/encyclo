const express = require("express");
const app = express();
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");

// Layouts
const views = require("./views");

// Middleware
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);

// Database
db.authenticate().then(() => console.log("Connected to the database"));

// Main Route
app.get("/", (req, res) => {
  res.send(views.main());
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
