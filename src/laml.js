const { renameTag } = require('./helpers.js');
const metadata = require('./metadata.js');
const preamble = require('./preamble.js');
const abstract = require('./abstract.js');
const statements = require('./statements.js');
const figures = require('./figures.js');
const names = require('./names.js');

const laml = function(document) {
  metadata(document);
  preamble(document);
  abstract(document);
  statements(document);
  figures(document, false);
  names(document);

  // convert blames
  // TODO should depend on cm.css?
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    renameTag(document, blame, 'span', true);
  }

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

  // populate bibliographic citations
  const bibitems = document.querySelectorAll('bibliography > a');
  for (let [index, bibitem] of bibitems.entries()) {
    const counter = '[' + (index + 1) + ']';
    // TODO create DL in buildBib instead
    const counterNode = document.createTextNode(counter + ' ');
    bibitem.parentNode.insertBefore(counterNode, bibitem);
    const cites = document.querySelectorAll(
      'cite[target="' + bibitem.id + '"]'
    );
    for (let cite of cites) {
      cite.innerHTML = counter;
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + bibitem.id);
      cite.parentNode.replaceChild(anchor, cite);
      anchor.appendChild(cite);
    }
  }

  // handle (foot)notes
  const notes = document.querySelectorAll('note');
  for (let [index, note] of notes.entries()) {
    const newNote = renameTag(document, note, 'span');
    newNote.classList.add('footnote');
    newNote.id = 'fn-' + index;
    const fnlink = document.createElement('a');
    fnlink.setAttribute('href', '#' + newNote.id);
    fnlink.id = 'fnlink' + index;
    fnlink.innerHTML = '<sup>' + (index + 1) + '</sup>';
    newNote.parentNode.insertBefore(fnlink, newNote);
    const backlink = document.createElement('a');
    backlink.setAttribute('href', '#' + fnlink.id);
    backlink.innerHTML = '<sup>🔙</sup>';
    backlink.classList.add('backlink');
    newNote.appendChild(backlink);
    // TODO not actually disabling clicks
    fnlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
    backlink.addEventListener(
      'click',
      function(event) {
        event.preventDefault();
      },
      false
    );
  }

  const buildBib = function() {
    const oldBib = document.querySelector('bibliography');
    const bib = renameTag(document, oldBib, 'section');
    bib.classList.add('bibliography');
    // const inner = bib.innerHTML;
    // bib.innerHTML = '';
    const heading = document.createElement('h2');
    heading.innerHTML = 'Bibliography';
    bib.insertBefore(heading, bib.firstChild);
    // const list = document.createElement('ul');
    // bib.appendChild(list);
    // for (let string of inner.split('\n')){
    //     if (string.trim() === '') continue
    //     const item = document.createElement('li');
    //     item.innerHTML = string.substring(2);
    //     list.appendChild(item);
    // }
  };
  buildBib();

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
};

module.exports = laml;
