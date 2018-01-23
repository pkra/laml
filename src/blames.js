const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // convert blames to headings
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    const previous = blame.previousElementSibling;
    if (previous && (previous.classList.contains('name') || previous.tagName === 'NAME')) {
      const renamedNode = renameTag(document, blame, 'span', true);
      previous.appendChild(renamedNode);
    }
    // TODO look up correct heading level
    else {const renamedNode = renameTag(document, blame, 'h2', true);}
  }
};
