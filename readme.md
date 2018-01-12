# laml

A lame joke on LaTeX and HTML.

A simple JS file that converts LaTeX-like tag soup into something decent.


## TODOs

See [the issues](https://github.com/pkra/laml/issues/).


## Example components

Some simple components

* helpers
  * `renameTag` to "rename" elements
* pre-processing
  * MathJax-conformant TeX pre-processing
  * CommonMarkJS pre-processing
* article header: via json
  * pick up json metadata
  * add a section, heading, and paragraphs with information
*  abstract: `<abstract>`
  * rename to `<section>` and add a class.
*  theorem-environments via custom tag names (right now: `<theorem>, <lemma>, <proposition>, <corollary>, <proof>`)
  * select all suitable elements
  * rename to sections and add suitable classes
  * keep a counter for auto-numbering
  * if no `<name>`, add heading with auto-numbering
  * if `<blame>`, rename and add it
* figures via `<figure>`
  * if no `<name>`, add heading with auto-numbering
* generic heading via `<name>`
  * convert to heading and add class
* cross-references via `<ref target=ID>`
  * replace with `<a>` tags
  * look up target's heading to populate `<a>`content with it (but strip `<blame>`)
* bibliographic citations  via `<cite target=ID>`
  * for each bibitem in the bibliography
  * look up `<cite>` elements with target=ID of bibitem
  * populate `<cite>` with content and wrap link pointing to bibitem
* (foot)notes via `<note>`
  * create footnote-caller
  * add backlink from footnote to footnote-caller

## Demo

[Vince Vatter, An Erdős-Hajnal analogue for permutation classes"](./vatter-out.html)

## Getting started

* in-browser preview (e.g., while authoring HTML or laml itself)
  * create an HTML file in this folder
  * add `<script src="dist/laml-browser.js"></script>` to it
  * run `npx reload -b -s YOUR.html`
  * put newly opened browser window and editor with the HTML file side-by-side
  * just save the HTML to refresh the browser
* server-side conversion
  * Run `$ node index.js input.html output.html`
  * Open `output.html`
* TODO server side processing with live reload
  * maybe https://github.com/tapio/live-server "middleware" fits?