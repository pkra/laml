const posthtml = require('posthtml');
const fs = require('fs');
const html = fs.readFileSync('vatter.html').toString();
const customelements = require('posthtml-custom-elements')
const md = 	require('./posthtml-markdownit.js')();
// console.log(html)

const result = posthtml([
  customelements(),
  md
  ])
  .process(html, { sync: true })
  .html

fs.writeFileSync('post.html',result);
