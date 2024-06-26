+++
title = "Blogging with org-mode and hugo"
author = ["Shubham Kumar"]
date = 2021-09-16
tags = ["org", "hugo", "emacs"]
categories = ["hugo"]
draft = true
+++

Once you are far down the path of using emacs and org-mode, it feels wasteful to
learn a whole new scheme for generating text. As much as I love markdown, I
would much rather put my muscle memory to use keeping my content in org-mode
files. This thinking took me to the excellent org-mode extension [ox-hugo](https://ox-hugo.scripter.co/). This
module allows you to keep your content in a monolithic org file and simply
exports neatly to the markdown that hugo expects.


## Installation {#installation}

Installing ox-hugo is pretty trivial. I am using [Doom Emacs](https://github.com/hlissner/doom-emacs) so enabling ox-hugo
is as simple as adding the following to your init.el:

{{< highlight emacs-lisp >}}
(doom! :lang
       (org +hugo))
{{< /highlight >}}

Run a doom sync and you will be good to go.

If you are using a more vanilla emacs, you just need the following to load
ox-hugo with the popular `use-package` macro:

{{< highlight emacs-lisp >}}
(use-package ox-hugo
  :ensure t
  :after ox)
{{< /highlight >}}

Note that this assumes you already have org mode installed. For more on that see
[here](https://orgmode.org/install.html).


## Content {#content}

The content is all stored in a monolithic org-mode document and is exported to
markdown suitable for processing by hugo with a regular export command. There's
a few things to note about the structure of this org-mode doc.

_Note that the raw org file can be seen [here](https://raw.githubusercontent.com/carlf/carlf.github.io/main/posts.org)._

First, the document starts with some key configuration.

{{< highlight org >}}
#+HUGO_BASE_DIR: ~/repos/carlf.github.io
#+HUGO_SECTION: posts
#+HUGO_CODE_FENCE: nil
{{< /highlight >}}

This configures ox-hugo by telling it where the markdown should be exported to,
what section the top-level headings should be exported to, and to use the
highlight shortcode rather than the triple-backtick code fence. Since my blog is
configured using the default code highlighter, I went with `nil` here but you
could just as easily set it to `t`.

Second, each post has some front matter that configures the metadata on export.
Let's take a look at the beginning of this particular org doc.

{{< highlight org >}}
* Hugo :@hugo:
** Blogging with org-mode and hugo :org:hugo:emacs:
:PROPERTIES:
:EXPORT_FILE_NAME: blogging_with_org_and_hugo
:EXPORT_DATE: 2021-09-14
:ID:       40dc81ff-8c52-482b-a2f0-7e1d1f4f583d
:END:
{{< /highlight >}}

The top level heading sets the category of the posts under it. In this case, the
category is hugo. The tag on the heading is what sets the category. Next we have
the second level heading which sets the name of the post and the tags associated
with it. In this case I am setting the tags org, hugo, and emacs. Then the
properties set the file name of the exported markdown and the publish date. The
ID field is particularly useful for linking between pages. If you make a link to
an ID in your org document, that is automatically translated to a link the
appropriate exported page by ox-hugo.


## Export {#export}

Once you have your post ready to go, you still need to export to markdown so
hugo can process your posts. I usually do this while running `hugo serve` so I
can look at my exported posts as I work. To export with ox-hugo, you can go to
the export dispatch menu. In doom emacs this is via `SPC m e`. In regular emacs,
this would be via `C-c C-e`. In either case you will hit `H A` to export all
posts from your file.

Let's take a look a the header of the file generated by this post.

{{< highlight text >}}
+++
title = "Blogging with org-mode and hugo"
author = ["Carl Flippin"]
date = 2021-09-14
tags = ["org", "hugo", "emacs"]
categories = ["hugo"]
draft = false
+++
{{< /highlight >}}

As you can see, all the frontmatter you would expect from the discussion above
is there. One note on the draft status. If the top level heading for a post is a
`TODO` ox-hugo will mark it as a draft. If it has no status or the status is
done, it will be posted with draft set to false.


## Hosting {#hosting}

After you export, you are ready to host your site. If you want to do it
manually, you just need to run hugo to generate your HTML and put it on your web
server. For a simpler, hosting experience, you probably want to check out Github
Actions and Github Pages or maybe a service like Netlify to make the build and
deploy process more automatic. For this blog, I am using Github Actions and
Github Pages with a dash of Cloudflare as a CDN but that is the subject of
another post.l

{{< highlight java >}}
System.out.println("hello");
{{< /highlight >}}

{{< figure src="/ox-hugo/mermaid-test.png" >}}


## My additions {#my-additions}

1.  `SPC - X` to start a capture
2.  Open project and export -- `SPC P P` and then `SPC m e` then `H A`
