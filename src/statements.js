const { renameTag } = require('./helpers.js');

const defaultConfig = {
  proof: { fullName: 'Proof' },
  theorem: { fullName: 'Theorem' },
  proposition: { fullName: 'Proposition' },
  lemma: { fullName: 'Lemma' },
  corollary: { fullName: 'Corollary' }
};

module.exports = function(document, config = defaultConfig) {
  // convert statements to section
  const selector = [];
  for (let key in config) selector.push(key);
  const statements = document.querySelectorAll(selector.join(','));
  let statement_counter = 0;
  for (let statement of statements) {
    const renamedNode = renameTag(document, statement, 'section', true);
    const configEntry = config[statement.tagName.toLowerCase()];
    const fullName = configEntry.fullName;
    renamedNode.classList.add('statement');
    renamedNode.classList.add(
      configEntry.className || 'statement__' + fullName.toLowerCase()
    );
    const name = renamedNode.querySelector('name');
    // TODO maybe name handling is more like a helper that should be required and applied here?
    if (name) continue;
    statement_counter++;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.id = fullName.toLowerCase() + '-' + statement_counter;
    heading.innerHTML = fullName + ' ' + statement_counter;
    renamedNode.insertBefore(heading, renamedNode.firstChild);
  }
};
