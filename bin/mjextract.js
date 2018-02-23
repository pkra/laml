const fs = require('fs');
const path = require('path');
const {tex2jax} = require('../src/tex2jax.js');
const mj = require('mathjax-node-sre').typeset;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const inputfilename = path.join(__dirname, process.argv[2]);
const input = fs.readFileSync(inputfilename).toString();
const dom = new JSDOM(input);
const window = dom.window;

const store = {};

const worker = async function(window, store) {
  const document = window.document;

  window.tex2jax = tex2jax;
  window.tex2jax.config.doc = document;
  window.tex2jax.config.inlineMath.push(['$', '$']);
  window.tex2jax.config.processEscapes = true;
  window.tex2jax.PreProcess();

  const equations = document.querySelectorAll('script[type^="math/tex"]');
  for (let equation of equations) {
      const type = (equation.getAttribute('type') === 'math/tex') ? "inline-TeX" : "TeX";
      const tex = equation.text;
      const key = type +'%' + tex;
      if (store[key]) continue;
      const options = {
          math: tex,
          format: type,
          svg: true
      }
    const result = await mj(options);
    store[key] = {
        math: tex,
        format: type,
        svg: result.svg
    }
  }

};

(async () => {
    try {
      await worker(window, store);
      fs.writeFileSync(path.join(path.dirname(inputfilename), 'store.json'), JSON.stringify(store, null, 4));
    } catch (err) {
      console.log(err);
    }
  })()

