const { renameTag } = require('./helpers.js');
const yamldata = require('./yamldata.js')
const metadata = require('./metadata.js');
const preamble = require('./preamble.js');
const abstract = require('./abstract.js');
const sectioning = require('./sectioning.js');
const statements = require('./statements.js');
const figures = require('./figures.js');
const names = require('./names.js');
const blames = require('./blames.js');
const refs = require('./refs.js');
const cites = require('./cites.js');
const notes = require('./notes.js');
const bibliography = require('./bibliography.js')

module.exports = function(document) {
  yamldata(document);
  const data = metadata(document);
  preamble(document);
  abstract(document);
  sectioning(document);
  statements(document, data.laml.statements);
  figures(document, false);
  names(document);
  // TODO should depend on cm.css?
  blames(document);
  refs(document);
  cites(document);
  notes(document);
  bibliography(document);
};

