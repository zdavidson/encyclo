const express = require("express");
const app = express();
const morgan = require("morgan");
const { db, Page, User } = require("./models");

// Layouts
const views = require("./views");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

// Database

db.authenticate().then(() => console.log("Connected to the database"));

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
