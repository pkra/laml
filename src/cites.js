module.exports = function(document) {
  // populate bibliographic citations
  const bibitems = document.querySelectorAll('bibliography a');
  for (let [index, bibitem] of bibitems.entries()) {
    const counter = '[' + (index + 1) + ']';
    // TODO create DL in buildBib instead
    const counterNode = document.createTextNode(counter + ' ');
    bibitem.parentNode.insertBefore(counterNode, bibitem);
    const cites = document.querySelectorAll(
      'cite[target="' + bibitem.id + '"]'
    );
    for (let cite of cites) {
      if ( /^\s*$/.test(cite.innerHTML) ) {
        // the node is whitespace, replace it with our defaults
        cite.innerHTML = counter;
      } else {
        // leave it alone
      }
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + bibitem.id);
      cite.parentNode.replaceChild(anchor, cite);
      anchor.appendChild(cite);
    }
  }
}
