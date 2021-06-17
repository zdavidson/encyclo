const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`<h3>404: Page Not Found</h3>
    <hr />
    <p>Sorry, this page wasn't found</p>`);
