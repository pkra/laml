const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // convert names to headings
  const names = document.querySelectorAll('name');
  for (let name of names) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, name, 'h2', true);
  }
};
