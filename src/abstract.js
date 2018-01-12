const { renameTag } = require('./helpers.js');
module.exports = function(document){
  // abstract
  renameTag(document, 'abstract', 'section', true);
}
