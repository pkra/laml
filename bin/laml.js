#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console);
const { JSDOM } = jsdom;

const {worker} = require('../src/worker.js');
const stylesheet = require('../src/stylesheet.js');

// process CLI arguments
const argv = require('minimist')(process.argv.slice(2));

if (!argv.i || !argv.o) {
  console.log('Required arguments: -i path/to/input.html -o path/to/output.html | Optional: -f [fragment]');
  process.exit();
}

const input = fs.readFileSync(argv.i).toString();
const outputname = argv.o;
const isFragment = Boolean(argv.f);

const store = JSON.parse(fs.readFileSync(path.join(path.dirname(argv.i), 'store.json')));
if (!store) {
  console.log('No store found. Please run mjextract.');
  process.exit(1);
}

const dom = new JSDOM(input, {
  virtualConsole: virtualConsole,
  userAgent: 'Node.js'
});
const window = dom.window;

stylesheet(window.document);
worker(window);

const equations = window.document.querySelectorAll('script[type^="math/tex"]');
for (let equation of equations) {
  const type = (equation.getAttribute('type') === 'math/tex') ? "inline-TeX" : "TeX";
  const tex = equation.text;
  const key = type +'%' + tex;
  let svg = '';
  if (store[key]) svg = store[key].svg;
  const span = window.document.createElement('span');
  span.setAttribute('class', type);
  span.innerHTML = svg;
  equation.parentNode.replaceChild(span, equation);
}

// move anything that ends up in the head (e.g., leading script tags) back to the body
if (isFragment){
  for (let node of window.document.querySelectorAll('head *')) window.document.body.insertBefore(node, window.document.body.firstChild);
}

// write out
const output = isFragment ? window.document.body.innerHTML : dom.serialize();
fs.writeFileSync(outputname, output);
// clean up
window.close();
