+++
title = "Designing my own theme in Hugo - I"
author = ["Shubham Kumar"]
date = 2025-02-15T07:06:00+05:30
tags = ["hugo"]
categories = ["hugo"]
draft = false
series = "learninghugo"
+++

## Hugo is all about themes {#hugo-is-all-about-themes}

Hugo is a developers dream of static sites.
Whether you are planning on a new blog site or maybe a documentation for a product, you can easily launch a static site using Hugo.

The most powerful feature of Hugo is its simplicity.
It is designed to separate your content from styling.
This means you can write your content in normal markdown files independent of all the website pages and layouts.
The actual design of the website can be stored as a separate theme.
And as it is independent of the content, you can easily switch themes without ever thinking about your content.


## Creating a new theme {#creating-a-new-theme}

To create a new theme, you can just use the below hugo command.
It will create a new directory under theme with your theme name.

{{< highlight bash >}}
hugo new theme <theme-name>
{{< /highlight >}}

The below files will be created on executing the above command.
Let's get an idea on what are these files in this blog.

{{< highlight text >}}
.
└── awesometheme
    ├── LICENSE
    ├── archetypes
    │   └── default.md
    ├── layouts
    │   ├── 404.html
    │   ├── _default
    │   │   ├── baseof.html
    │   │   ├── list.html
    │   │   └── single.html
    │   ├── index.html
    │   └── partials
    │       ├── footer.html
    │       ├── head.html
    │       └── header.html
    ├── static
    │   ├── css
    │   └── js
    └── theme.toml

8 directories, 11 files
{{< /highlight >}}

The interesting part are the archetypes and layouts directory.
The layout directory contains the template for your pages.
A single page template is defined inside `single.html`.
A page containing a list of items like blog posts are defined inside `list.html`.

The archetypes directory provides the defaults for a type of content.
When you run `hugo new content post/learninghugo`, the new file is created using the default template as described in `archetypes/default.md`, given you don't have any overrides.


## Applying the theme {#applying-the-theme}

My blogs are written in Hugo so I can just start experimenting with my blogs theme.
This way, I can forget about generating any dummy content for my theme.

To tell Hugo to use a theme, you can just update the theme entry in your config.
My blog site uses toml, so below are the changes.

{{< highlight diff >}}
- theme = "poison"
+ theme = "awesometheme"
{{< /highlight >}}

Now let's run the dev server using `hugo server --buildDrafts`.
And I got the below error.

{{< highlight bash >}}
2025-02-15 06:00:39.535 +0530
ERROR 2025/02/15 06:00:39 render of "section" failed: "/home/cold/Projects/Personal/blog.shubham.codes/layouts/_default/baseof.html:1:3": execute of template failed: template: cv/cv.html:1:3: executing "cv/cv.html" at <partial "head/head.html" .>: error calling partial: partial "head/head.html" not found
ERROR 2025/02/15 06:00:39 failed to render pages: render of "home" failed: "/home/cold/Projects/Personal/blog.shubham.codes/layouts/_default/baseof.html:1:3": execute of template failed: template: index.html:1:3: executing "index.html" at <partial "head/head.html" .>: error calling partial: partial "head/head.html" not found
{{< /highlight >}}

Seems like, I have overridden the [poison](https://github.com/lukeorth/poison) theme for customization.
But now, I am using my own theme which does not contains the poison partials.
And this is causing the issue.

Both the error corresponds to my layout's directory.
So let's rename layouts to layouts\_.
And we will need to refactor these layouts as well.

> And this is why you should always keep your code loosely coupled

{{< highlight bash >}}
mv layouts layouts_
{{< /highlight >}}

And it worked.

{{< highlight text >}}
Start building sites …
hugo v0.92.2+extended linux/amd64 BuildDate=2023-01-31T11:11:57Z VendorInfo=ubuntu:0.92.2-1ubuntu0.1

                   |  EN
-------------------+-------
  Pages            |   13
  Paginator pages  |    0
  Non-page files   |    0
  Static files     | 1014
  Processed images |    0
  Aliases          |    0
  Sitemaps         |    1
  Cleaned          |    0

Built in 88 ms
Watching for changes in /home/cold/Projects/Personal/blog.shubham.codes/{archetypes,assets,content,data,static,themes}
Watching for config changes in /home/cold/Projects/Personal/blog.shubham.codes/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
{{< /highlight >}}

But my screen is blank.


## Summary {#summary}

In this post, we went thorough the basic flow of creating a new theme in Hugo.
Next, we will learn about layouts and implement the single and list layout for the blog.
