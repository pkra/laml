module.exports = function(document) {
  const TAGNAMES = [
    'body',
    'chapter',
    'section',
    'theorem',
    'lemma',
    'proposition',
    'corollary',
    'proof',
    'abstract',
    'figure'
  ];
  const candidates = document.querySelectorAll(TAGNAMES.join(','));
  for (let candidate of candidates) {
    // for (let child of candidate.childNodes) {
    //   if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
    //     child.nodeValue = '\n' + child.nodeValue.replace(/\n/g, '\n\n') + '\n';
    //   }
    // }
    const text = document.createTextNode('\n\n');
    candidate.appendChild(text);
    candidate.insertBefore(text.cloneNode(true), candidate.firstChild);
  }
};

// wrap phrasing content in p

// const PHRASING_TAGNAMES = ['abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'command', 'data', 'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'keygen', 'label', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'var', 'video', 'wbr', 'a', 'del', 'ins']
// const candidates = []//document.querySelectorAll('body, section, figure');
// for (let candidate of candidates){
//   // console.log(candidate)
//   const childNodes = candidate.childNodes;
//   const arrayofarrays = [[]];
//   for (let childNode of childNodes){
//     const currentBatch = arrayofarrays[arrayofarrays.length -1];
//     // console.log(childNode)
//     if (childNode.nodeType === 3){
//       const lines = childNode.data.split('\n');
//       let temp = childNode;
//       for (let [index, line] of lines.entries()){
//         if (index === 0) {
//           childNode.data = line;
//           currentBatch.push(childNode);
//         }
//         else {
//           const lineElement = document.createTextNode(line);
//           // console.log('Before', childNode.nextSibling)
//           childNode.parentNode.insertBefore(lineElement, temp.nextSibling);
//           temp = lineElement;
//           // console.log('After', childNode.nextSibling)
//           arrayofarrays.push([lineElement]);
//         }
//       }
//     }
//     else if (childNode.nodeType === 8 || PHRASING_TAGNAMES.indexOf(childNode.tagName.toLowerCase()) > -1) {
//       currentBatch.push(childNode);
//     }
//     else if(currentBatch.length > 0)  arrayofarrays.push([]);
//   }
//   console.log(arrayofarrays)
//   for (let array of arrayofarrays){
//     if (array.length === 0) continue
//     const para = document.createElement('p');
//     const first = array[0];
//     // console.log(first);
//     first.parentNode.replaceChild(para, first);
//     for (node of array) para.appendChild(node);
//   }
// }
