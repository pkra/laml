# FAQ

## You seem to just be using custom tag names. Why not just use XML?

Well we certainly don't want to expose the authors to XML---it's really heavy to write and edit, even with desktop tools. It's annoying enough to use `<p>` tags in pure HTML. One might use XML as some kind of intermediate format, but we're having a pretty good time just going from the LAML format directly to HTML, which is what we really want in the end anyway. It is true that some of our steps would be fun to implement in XSLT, but not all of them, and the advantages of pure Javascript are massive.

## Nice try, but I can't write for the web. I have to use LaTeX for sure (for print, publishing, and colleagues), and I'm certainly not going to write my article twice.

Ok.

Actually browsers are pretty good a printing. The math will never be as pixel perfect as in LaTeX. But MathJAX is based on the TeXBook and looks pretty good these days. Moreover it has tons of features LaTeX will simply never have, like accessibility. We think this is more important than being pixel perfect in ink.

As for publishing, it used to be that publishers loved authors to use LaTeX because then they didn't have to do any work. But now that everything has to be simultaneously published to the web, suddenly publishers have to do TONS of work on your LaTeX submission. They should be happy if a bunch of us started submitting things closer to HTML, especially if we make the tools to help them process it.

Don't forget that the arXiv takes HTML too.

Regarding your colleagues, I guess it depends on their attitude! It might be appropriate for some collaborations but not others.

## Why don't you just use XX markdown extension?

Because it doesn't have YY feature. We would need to extend it further anyway, so it's easier for us and easier for authors to grok if we just start with CommonMark.

## ...
