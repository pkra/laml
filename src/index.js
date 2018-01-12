const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console);
const { JSDOM } = jsdom;

const {worker} = require('./worker.js');

// process CLI arguments
const input = fs.readFileSync(process.argv[2]).toString();
const outputname = process.argv[3];

const dom = new JSDOM(input, {
  virtualConsole: virtualConsole,
  userAgent: 'Node.js'
});
const window = dom.window;

worker(window);

// write out
let output = dom.serialize();
fs.writeFileSync(outputname, output);
// clean up
window.close();
