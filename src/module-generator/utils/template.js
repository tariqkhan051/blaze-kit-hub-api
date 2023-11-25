const ejs = require("ejs");

const render = (content, data) => {
  return renderContent(content, data);
};

const renderMethodFile = (content, data) => {
  return renderContent(content, data);
};

const renderContent = (content, data, opts) => {
  return ejs.render(content, data);
};

module.exports = {
  render,
  renderMethodFile,
  renderContent
};
