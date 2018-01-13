const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  const bib = renameTag(document, 'bibliography', 'section', true);
  const heading = document.createElement('h2');
  heading.innerHTML = 'Bibliography';
  bib.insertBefore(heading, bib.firstChild);
};
