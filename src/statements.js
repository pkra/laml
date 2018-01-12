const { renameTag } = require('./helpers.js');

module.exports = function(document){
  // convert statements to sections
  const statements = document.querySelectorAll(
    'proof, theorem, proposition, lemma, corollary'
  );
  let statement_counter = 0;
  for (let statement of statements) {
    const renamedNode = renameTag(document, statement, 'section', true);
    const tagname = statement.tagName.toLowerCase();
    renamedNode.classList.add(tagname);
    const name = renamedNode.querySelector('name');
    // TODO maybe name handling is more like a helper that should be required and applied here?
    if (name) continue;
    statement_counter++;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.id = tagname.toLowerCase() + '-' + statement_counter;
    heading.innerHTML =
      tagname[0].toUpperCase() + tagname.substring(1) + ' ' + statement_counter;
    renamedNode.insertBefore(heading, renamedNode.firstChild);
  }

}
