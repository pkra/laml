# FAQ

* [I can't use this because...](#i-cant-use-this-because)
* [Why don't you just...](#why-dont-you-just)

## I can't use this because...

### This is a nice idea, but I just really have to use LaTeX and I'm not going to type my article twice.

Do you? See the next few items.

### I can't write for the web because I need to be able to print out my article.

Browsers are getting pretty good at it. The math will never be as pixel perfect as in LaTeX. But MathJAX is based on the TeXBook and looks pretty good these days. Moreover it has tons of features LaTeX will simply never have, like accessibility. We think this is more important than being pixel perfect in ink.

### I can't write for the web because I need to publish my article.

It used to be the case that publishers loved it when authors used LaTeX because it meant that the authors were doing all the work of typesetting for them. But that was in the days of print-only publishing. Now that everything has to be simultaneously published to the web, and in many cases *only* published to the web, LaTeX isn't as handy for publishers. They actually do TONS of work to be able to use your LaTeX submission. They should be happy if we submit something that is closer to HTML, especially if we make the tools to help them process it.

### I can't write for the web because all my collaborators use LaTeX.

Moving beyond LaTeX might be appropriate for some collaborations and not appropriate for others.

### I can't write for the web because I make my figures in TikZ.

For now you can just use TikZ with SVG output to premake your figures, and manually include them in your document (instructions forthcoming).

Of course, it would be awesome to have a TikZ package for the web. Maybe you will write one? If you just need commutative diagrams there are a couple of tools already: tikzcd-editor, jsx-tikzcd. Of course you can always use one of the gazillion other tools to make figures on the web.

### Your bibliography is just links. This may be good enough for the web, but not for print.

That is true for now. But it should be easy to use Bibtex data to produce a more detailed bibliography if that's what you need. One package that exists now is bibtex-js.

But consider also that classical bibliographies are made for in-library research. With web searching, all you really need these days is author and title. The links (especially with DOI) are more than enough for practical purposes.

### I really need XX LaTeX package.

That may be true. But will you really be using this package in perpetuity? The authors and maintainers may have died already. Maybe you or someone else will implement it in Javascript. More likely there is another way.

## Why don't you just...?

### Why don't you just use XX markdown extension?

Because it doesn't have YY feature. We would need to extend it further anyway, so it's easier for us and easier for authors to grok if we just start with CommonMark.

### Why don't you just use XML? You seem to basically be using custom tag names.

Well we certainly don't want to expose the authors to XML---it's really heavy to write and edit, even with desktop tools. It's annoying enough to use `<p>` tags in pure HTML. One might use XML as some kind of intermediate format, but we're having a pretty good time just going from the LAML format directly to HTML, which is what we really want in the end anyway. It is true that some of our steps would be fun to implement in XSLT, but not all of them, and the advantages of pure Javascript are massive.

### ...
