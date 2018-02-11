const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // convert ref to links
  const refs = document.querySelectorAll('ref');
  for (let ref of refs) {
    const renamedNode = renameTag(document, ref, 'a');
    const targetId = renamedNode.getAttribute('target');
    renamedNode.classList.add('ref');
    renamedNode.setAttribute('href', '#' + targetId);
    renamedNode.removeAttribute('target');
    if (!/^\s*$/.test(renamedNode.innerHTML)) {
      // the node has some nontrivial contents
      continue;
    }
    // the node is whitespace. replace it with our defaults.
    const target = document.getElementById(targetId);
    let refText =
      '<span style="color:red; background-color:yellow; border: 1px solid red">ERROR: TARGET NOT FOUND</span>';
    if (target && target.querySelector('h1, h2, h3, h4, h5, h6')) {
      const targetHeading = target.querySelector('h1, h2, h3, h4, h5, h6');
      if (targetHeading) {
        clonedHeading = targetHeading.cloneNode(true);
        // strip blame
        if (targetHeading.querySelector('.blame'))
          targetHeading.removeChild(targetHeading.querySelector('.blame'));
        refText = clonedHeading.innerHTML;
      } else {
        console.error(ref, 'Target has no heading');
        refText =
          '<span style="color:red; background-color:yellow; border: 1px solid red">ERROR: TARGET HAS NO HEADING</span>';
      }
    } else console.error(ref, 'Target not found');
    renamedNode.innerHTML = refText;
  }
};
