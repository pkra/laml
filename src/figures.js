module.exports = function(document, belowOrAbove) {
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
    if (belowOrAbove) figure.insertBefore(heading, figure.firstChild);
    else figure.insertBefore(heading, figure.firstChild);
  }
};
