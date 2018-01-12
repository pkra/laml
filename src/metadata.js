module.exports = function(document) {
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

};
