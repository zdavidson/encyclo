const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (err) =>
  layout(html`<h3>Error</h3>
    <hr />
    <p>${err.message}</p>`);
