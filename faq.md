# FAQ

* [I can't use this because...](#i-cant-use-this-because)
* [Why don't you just...](#why-dont-you-just)
* [How do you...](#how-do-you)

## I can't use this because...

### This is a nice idea, but I just really have to use LaTeX and I'm not going to type my article twice.

Do you? See the next few items.

### I can't write for the web because I need to be able to print out my article.

Browsers are getting pretty good at it. The math will never be as pixel perfect as in LaTeX. But MathJAX is based on the TeXBook and looks pretty good these days. Moreover it has tons of features LaTeX will simply never have, like accessibility. We think this is more important than being pixel perfect in ink.

### I can't write for the web because I need to publish my article in a journal.

It used to be the case that publishers loved it when authors used LaTeX because it meant that the authors were doing all the work of typesetting for them. But that was in the days of print-only publishing. Now that everything has to be simultaneously published to the web, and in many cases *only* published to the web, LaTeX isn't as handy for publishers. They actually do TONS of work to be able to use your LaTeX submission. They should be happy if we submit something that is closer to HTML, especially if we make the tools to help them process it.

### I can't write for the web because all my collaborators use LaTeX.

Moving beyond LaTeX might be appropriate for some collaborations and not appropriate for others. Consider it a fun experiment, like using git for the first time.

### I can't write for the web because I make my figures in TikZ.

For now you can just use TikZ with SVG output to premake your figures, and manually include them in your document (instructions forthcoming).

Of course, it would be awesome to have a TikZ package for the web. Maybe you will write one? If you just need commutative diagrams there are a couple of tools already: tikzcd-editor, jsx-tikzcd. Of course you can always use one of the gazillion other tools to make figures on the web.

### I can't use this because I really need XX LaTeX package.

That may be true. But will you really be using this package in perpetuity? The authors and maintainers may have died already. Maybe you or someone else will implement it in Javascript. More likely there is another way.

## Why don't you just...?

### Why don't you just use XX Markdown extension?

Because it doesn't have YY feature. We would need to extend it further anyway, so it's easier for us and easier for authors to grok if we just start with CommonMark.

### Why don't you just use HTML? Everyone knows it. Some of us have been using it for decades. It's compatible with everything else on the web.

First of all, that's exactly why we are using HTML! But we are also providing some extras to make our lives easier. For example we don't like having to use `<p>` tags because they make it difficult to reorganize paragraphs on the fly, and Markdown helps with that.

Second of all, HTML is very general and it is really meant to be reined in for special purposes like ours. Consider that the tag names are general and don't have any fixed interpretation. Any two authors writing math research in HTML are likely to make different choices. Is a theorem a div, or just a paragraph with a span at the beginning? With this project we hope to attract a community of people who either like thinking about these silly issues or want someone else to think about it for them. Then the community can provide a common set of idioms and tools that are helpful for math writing.

### Why don't you just use XML? You seem to basically be using custom tag names.

Well we certainly don't want to expose the authors to XML---it's really heavy to write and edit, even with desktop tools. It's annoying enough to use `<p>` tags in pure HTML. One might use XML as some kind of intermediate format, but we're having a pretty good time just going from the LAML format directly to HTML, which is what we really want in the end anyway. It is true that some of our steps would be fun to implement in XSLT, but not all of them, and the advantages of pure Javascript are massive.

## How do you...

### It looks like you typed your sample bibliography by hand. How can I get that from a bib file or json data?

For now we are just copying the bibliography text from Bibtex. But it is not difficult to imagine producing the bibliography automatically using JS, and perhaps this should be implemented. One package that exists already is bibtex-js.

But consider also that classical bibliographies are made for in-library research. With web searching, all you really need these days is author and title. The links (especially the ones with the DOI) are more than enough for all practical purposes! Also they are more general to allow various modern types of references (tweets anyone?).
