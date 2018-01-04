const posthtml = require('posthtml');
const fs = require('fs');
const html = fs.readFileSync('vatter.html').toString();
const customelements = require('posthtml-custom-elements')
const md = 	require('./posthtml-markdownit.js')();
const statement =  require('./posthtml-statement.js')();
// const name =  require('./posthtml-name.js')();

const result = posthtml([
  statement
  // customelements()
  // , md
  ])
  .process(html, { sync: true })
  .html

fs.writeFileSync('post.html',result);
