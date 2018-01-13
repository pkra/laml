const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // convert blames to headings
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    // TODO look up correct heading level
    const renamedNode = renameTag(document, blame, 'h2', true);
  }
};
