const { renameTag } = require('./helpers.js');
module.exports = function(document){
    for (chapter of document.querySelectorAll('chapter')) renameTag(document, 'chapter', 'section', true);
}
