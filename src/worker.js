const {laml} = require('./laml.js');
const {tex2jax} = require('./tex2jax.js');
const commonmark = require('commonmark');

const worker = function(window) {
  const document = window.document;
  window.tex2jax = tex2jax;
  window.tex2jax.config.doc = document;
  window.tex2jax.config.inlineMath.push(['$', '$']);
  window.tex2jax.config.processEscapes = true;
  window.tex2jax.PreProcess();

  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(document.body.innerHTML);
  document.body.innerHTML = writer.render(parsed);

  laml(document);
};

if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'){
    module.exports.worker = worker;
}
else worker(window);
