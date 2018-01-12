const laml = function(document) {
  // helpers

  // Source: https://stackoverflow.com/a/27404602/1339651
  const renameTag = function(node, newTagName) {
    const newNode = document.createElement(newTagName);
    while (node.firstChild) newNode.appendChild(node.firstChild);
    for (let attribute of node.attributes) {
      newNode.setAttribute(attribute.name, attribute.value);
    }
    newNode.setAttribute('data-originalTagName', node.tagName.toLowerCase());
    node.parentNode.replaceChild(newNode, node);
    return newNode;
  };

  // handle metadata
  const articleMeta = JSON.parse(document.getElementById('metadata').text);
  const articleInfo = document.createElement('section');
  articleInfo.classList.add('articleInfo');
  document.body.insertBefore(articleInfo, document.body.firstChild);

  const articleTitle = articleMeta.title;
  if (articleTitle) {
    const title = document.querySelector('title');
    title.innerHTML = articleTitle;
    const heading = document.createElement('h1');
    heading.innerHTML = articleTitle;
    articleInfo.appendChild(heading);
  }
  const articleAuthors = articleMeta.authors || [];
  for (let author of articleAuthors) {
    const name = author.name;
    const address = author.address;
    const authorP = document.createElement('p');
    authorP.classList.add('author');
    authorP.innerHTML = name + ', ' + address + '.';
    articleInfo.appendChild(authorP);
  }
  const keywords = articleMeta.keywords;
  const kw = document.createElement('p');
  kw.classList.add('keywords');
  kw.innerHTML = 'Keywords: ' + keywords.join(', ') + '.';
  articleInfo.appendChild(kw);

  const licensing = document.createElement('p');
  licensing.classList.add('license');

  licensing.innerHTML =
    'Derived from <a href="' +
    articleMeta.source +
    '">' +
    articleMeta.source +
    '</a>, ' +
    articleMeta.license +
    ' and licensed as such.';
  articleInfo.appendChild(licensing);

  // preamble
  renameTag(document.querySelector('preamble'), 'div').classList.add('.hidden');

  // abstract

  const abstract = document.querySelector('abstract');
  const newabs = renameTag(abstract, 'section');
  newabs.classList.add('abstract');

  // convert statements to sections
  const statements = document.querySelectorAll(
    'proof, theorem, proposition, lemma, corollary'
  );
  let statement_counter = 0;
  for (let statement of statements) {
    const renamedNode = renameTag(statement, 'section');
    const tagname = statement.tagName.toLowerCase();
    renamedNode.classList.add(tagname);
    const name = renamedNode.querySelector('name');
    if (name) continue;
    statement_counter++;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.id = tagname.toLowerCase() + '-' + statement_counter;
    heading.innerHTML =
      tagname[0].toUpperCase() + tagname.substring(1) + ' ' + statement_counter;
    renamedNode.insertBefore(heading, renamedNode.firstChild);
  }

  // handle figures
  const figures = document.querySelectorAll('figure');
  for (let [index, figure] of figures.entries()) {
    figure.classList.add('figure');
    const name = figure.querySelector('name');
    if (name) continue;
    // TODO look up correct heading level
    const heading = document.createElement('h2');
    heading.classList.add('name');
    heading.innerHTML = 'Figure ' + (index + 1);
    figure.insertBefore(heading, figure.firstChild);
    // TODO for amsart-like output figure.querySelector('img').nextSibling);
  }

  // convert names to headings
  const names = document.querySelectorAll('name');
  for (let name of names) {
    // TODO look up correct heading level
    const renamedNode = renameTag(name, 'h2');
    renamedNode.classList.add('name');
  }

  // convert blames
  // TODO should depend on cm.css?
  const blames = document.querySelectorAll('blame');
  for (let blame of blames) {
    renameTag(blame, 'span').classList.add('blame');
  }

  // convert ref to links
  const refs = document.querySelectorAll('ref');
  for (let ref of refs) {
    const renamedNode = renameTag(ref, 'a');
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
    const newNote = renameTag(note, 'span');
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
    const bib = renameTag(oldBib, 'section');
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

// if in NodeJS, export (cf. https://www.npmjs.com/package/detect-node), else run automatically
if (
  Object.prototype.toString.call(
    typeof process !== 'undefined' ? process : 0
  ) === '[object process]'
) {
  module.exports.laml = laml;
} else {
  laml(document);
  window.MathJax = {
    'fast-preview': {
      disabled: true
    }
  };
  const mj = document.createElement('script');
  mj.src =
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_CHTML-full';
  document.head.appendChild(mj);
}
