module.exports = function(document, config) {
  const sheet = document.createElement('link');
  sheet.setAttribute('rel', 'stylesheet');
  sheet.setAttribute('href', './css/laml.css');
  document.head.appendChild(sheet);
  return;
};
