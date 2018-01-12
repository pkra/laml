const { renameTag } = require('./helpers.js');
module.exports = function(document){
  // preamble
  renameTag(document,'preamble', 'div', 'hidden');
}
