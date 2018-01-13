const { renameTag } = require('./helpers.js');

module.exports = function(document) {
  // convert ref to links
  const refs = document.querySelectorAll('ref');
  for (let ref of refs) {
    const renamedNode = renameTag(document, ref, 'a');
    const targetId = renamedNode.getAttribute('target');
    const target = document.getElementById(targetId);
    renamedNode.classList.add('ref');
    renamedNode.setAttribute('href', '#' + targetId);
    renamedNode.removeAttribute('target');
    targetHeading = renamedNode.innerHTML = target
      .querySelector('h1, h2, h3, h4, h5, h6')
      .cloneNode(true);
    // strip blame
    if (targetHeading.querySelector('.blame'))
      targetHeading.removeChild(targetHeading.querySelector('.blame'));
    renamedNode.innerHTML = targetHeading.innerHTML;
  }
};
