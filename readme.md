# laml

A lame joke on LaTeX and HTML.

A bit of JS that converts a bunch of tags into something perhaps useful.

## So what's this?

A while ago, @scoskey asked @pkra got talking about authoring long form for the web when you have a LaTeX background.

@scoskey suggested that the key may be in the experience of having a text editor open (perhaps with a live preview side-by-side), writing somewhat raw code, having a bit of magic to transform said code into something nice, having the ability to modify existing transformations and adding your own.

@pkra claimed that this is not hard nowadays and @scoskey called him out on it.

This is the result.

*Caveat emptor* this is the result of a few hours.

## Demo

[Vince Vatter, An Erdős-Hajnal analogue for permutation classes"](./samples/vatter/vatter.html) ([source](https://github.com/pkra/laml/blob/master/samples/vatter/vatter.html))


## Example components

Some simple components

* helpers
  * `renameTag` to "rename" elements
* pre-processing
  * MathJax-conformant TeX pre-processing
  * CommonMarkJS pre-processing
* article header: via json or yaml
  * pick up yaml or json metadata
  * add a section, heading, and paragraphs with information
*  abstract: `<abstract>`
  * rename to `<section>` and add a class.
*  theorem-environments via custom tag names (default: `<theorem>, <lemma>, <proposition>, <corollary>, <proof>`, customizable via metadata)
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


## TODOs

See [the issues](https://github.com/pkra/laml/issues/).

## Getting started

* in-browser preview (e.g., while authoring HTML or laml itself)
  * create an HTML file in this folder
  * add `<script src="dist/laml-browser.js"></script>` to it
  * run `npx reload -b -s YOUR.html`
  * put newly opened browser window and editor with the HTML file side-by-side
  * just save the HTML to refresh the browser
* server-side conversion
  * Run `$ node bin/mjextract input.html` to generate a mathjax store (repeat whenever equations change)
  * Run `$ node bin/laml.js input.html output.html`
  * Open `output.html`
* when developing, it often helps to have automatic rebuilds and a server with live-reload
  * e.g., `$ npm run live ./samples/vatter/vatter.html` combines both of the above
* you can render to PDF via `$ node bin/renderPDF input.html`

## Tips and tools

Some tools and training tips might help.

### Learn Emmet

[Emmet](https://www.emmet.io/) is a fantastic tool built into many text editors these days. Think of it as overpowered code snippets.

We strongly suggest learning it as it makes writing lots of HTML reasonable.
