  // Source: https://stackoverflow.com/a/27404602/1339651
module.exports.renameTag = function(document, nodeOrSelector, newTagName, classOrTrue) {
    let node = nodeOrSelector;
    if (typeof node === 'string') node = document.querySelector(nodeOrSelector);
    if (!node) return new Error('No node found');
    let className = '';
    if (classOrTrue && classOrTrue === true) className = node.tagName.toLowerCase();
    if (typeof classOrTrue === 'string') className = classOrTrue;

    const newNode = document.createElement(newTagName);
    while (node.firstChild) newNode.appendChild(node.firstChild);
    for (let attribute of node.attributes) {
      newNode.setAttribute(attribute.name, attribute.value);
    }
    newNode.setAttribute('data-originalTagName', node.tagName.toLowerCase());
    if (className !== '') newNode.classList.add(className);
    node.parentNode.replaceChild(newNode, node);
    return newNode;
  };
