#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console);
const { JSDOM } = jsdom;

const {worker} = require('../src/worker.js');

// process CLI arguments
const argv = require('minimist')(process.argv.slice(2));

if (!argv.i || !argv.o) {
  console.log('Required arguments: -i path/to/input.html -o path/to/output.html | Optional: -f [fragment]')
}

const input = fs.readFileSync(argv.i).toString();
const outputname = argv.o;
const isFragment = Boolean(argv.f);

const dom = new JSDOM(input, {
  virtualConsole: virtualConsole,
  userAgent: 'Node.js'
});
const window = dom.window;

worker(window);

// move anything that ends up in the head (e.g., leading script tags) back to the body
if (isFragment){
  for (let node of window.document.querySelectorAll('head *')) window.document.body.insertBefore(node, window.document.body.firstChild);
}

// write out
const output = isFragment ? window.document.body.innerHTML : dom.serialize();
fs.writeFileSync(outputname, output);
// clean up
window.close();
