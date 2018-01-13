const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // handle (foot)notes
  const notes = document.querySelectorAll('note');
  for (let [index, note] of notes.entries()) {
    const newNote = renameTag(document, note, 'span');
    newNote.classList.add('footnote');
    newNote.id = 'fn-' + index;
    const fnlink = document.createElement('a');
    fnlink.setAttribute('href', '#' + newNote.id);
    fnlink.id = 'fnlink' + index;
    fnlink.innerHTML = '<sup>' + (index + 1) + '</sup>';
    newNote.parentNode.insertBefore(fnlink, newNote);
    const backlink = document.createElement('a');
    backlink.setAttribute('href', '#' + fnlink.id);
    backlink.innerHTML = '<sup>🔙</sup>';
    backlink.classList.add('backlink');
    newNote.appendChild(backlink);
    // TODO this is not actually disabling clicks
    fnlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
    backlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
  }
};
