const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const generateSlug = (title) => title.replace(/\s+/g, "_").replace(/\W/g, "");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

Page.beforeValidate((page) => {
  page.slug = generateSlug(page.title);
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

Page.belongsTo(User, { as: "author" });
User.hasMany(Page, { foreignKey: "authorId" });

const Tag = db.define("tag", {
  name: {
    type: Sequelize.STRING,
  },
});

Page.belongsToMany(Tag, { through: "page_tags" });
Tag.belongsToMany(Page, { through: "page_tags" });

module.exports = { db, Page, Tag, User };
