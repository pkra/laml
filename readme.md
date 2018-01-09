# Work item

* REJECTED Switch to PostHTML
  * write infrastructure to apply it
  * write plugins
* JS tooling
  * DONE bibliography
    * what should be the contents of the cite elements?
      * for now, we do numbers
  * TODO author can override with <li mark="">
    * not sure we can do this with a markdown processor
  * DONE convert custom elements?
    * DONE add headings
  * DONE theorem-env headings
    * DONE add auto-numbering XOR <name>
  * TODO long-term: the statement (aka theorem-type environment) element, with lots of configuration (name/blame, tag name, list of custom tags subtyped)
    * DONE blame
  * DONE cross-references
    * for now: pick up on <name> or [auto-number]
  * TODO (foot)notes
* DONE try markdown-it, markdown-it-mathjax
  * we use commonmark
