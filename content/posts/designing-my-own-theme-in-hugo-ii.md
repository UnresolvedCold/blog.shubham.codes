+++
title = "Designing my own theme in Hugo - II"
author = ["Shubham Kumar"]
date = 2025-02-17T20:32:00+05:30
tags = ["hugo"]
categories = ["hugo"]
draft = false
series = "learninghugo"
+++

## What we did and what we will do? {#what-we-did-and-what-we-will-do}

This is a part blog in which I am documenting my learning process of creating my own theme in Hugo.
Previously, we went through the basic flow of creating a theme.
My current theme is poison theme and we replaced the theme with our new theme which we named, "awesometheme".
But unfortunately, after applying the new theme, the rendered page was blank.

And in this post, we will expand our knowledge of Hugo and lean to render single pages.


## Layout and content separation {#layout-and-content-separation}

Hugo architecture keeps content separate from the layout.
This allows me to keep my blog post contents as it is and apply a new theme on the top of it.

There are 3 general pages and for each page there is a layout.
These pages are home page, single page and list pages.

The home page is the landing page of your site.
For a blog site, it can be the introductory page with list of recent blogs.

The single page defines a page with content.
For example, the blogs itself.

And list pages are the pages that displays the list of items.
For example, a list of blogs ordered in some preference.

You can define and customize more pages based on your preference but these are the basic ones.

As I already have the content ready, let's explore the layout designs first.


## Homepage {#homepage}

The home page layout is defined under `layouts/index.html`.

Currently, there isn't anything present in my index.html.

Let's write something arbitrary in it and check if something happens.

{{< highlight html >}}
<html>
  <head>
    <title>Shubham's Blog</title>
  </head>
  <body>
    <div>Hi all,</div>
    <div>How are you guys</div>
  </body>
</html>
{{< /highlight >}}

{{< highlight bash >}}
curl localhost:1313
{{< /highlight >}}

{{< highlight text >}}
<html>
  <head>
	<meta name="generator" content="Hugo 0.92.2" /><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>Shubham's Blog</title>
  </head>
  <body>
    <div>Hi all,</div>
    <div>How are you guys</div>
  </body>
</html>
{{< /highlight >}}

Now, I can see the title and body as I defined.


## List Layout {#list-layout}

Let's try to render a list of blogs.
The `_default/list.html` defines a default layout for all the list items.

I can enter any HTML code and it will be displayed.
But I want to do something more.
I want to iterate through all the blog contents which I keep in `posts` directory and create a link for the blog page.

This is where Hugo uses GoLang's templating library.
Anything beginning with a `.` refers to the current context.
I will explore more on contexts later.

The reference, `.Pages` contains a list of all the pages for this section.
So if, we are referring to posts directory, then `.Pages` will contain all the blogs inside the posts directory.

The for-loop is done using `range` keyword.
The `range` keyword iterates through a list and changes the context to the current item.
So calling `.Title` inside the range block will refer to the current blog's title.

We can do something as follows.

{{< highlight html >}}
<html>
  <head>
    <title>Shubham's Blog</title>
  </head>
  <body>
    <div>List of my recent posts ...</div>
    <ul>{{range .Pages}}
      <li>{{.Title}}</li>
      {{end}}
    </ul>
  </body>
</html>
{{< /highlight >}}

{{< highlight bash >}}
curl http://localhost:1313/posts/
{{< /highlight >}}

{{< highlight text >}}
<html>
  <head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>Shubham's Blog</title>
  </head>
  <body>
    <div>List of my recent posts ...</div>
    <ul>
      <li>Designing my own theme in Hugo - II</li>

      <li>Designing my own theme in Hugo - I</li>

      <li>Julia and basic matrix operations</li>

      <li>AOP in pure Java, keeping logging simple and aside</li>

      <li>Object pool design pattern in Java</li>

      <li>Downloading a single file from 2 independent apps</li>

      <li>Syncing org roam files across devices in WSL2 environment with better performance</li>

      <li>Reflection API in Java</li>

    </ul>
  </body>
</html>
{{< /highlight >}}


## Single page layout {#single-page-layout}

The single pages like the actual blog post layout can be defined inside, `_default/single.html`
Same as what we did in the list layout, we can call `.Content`  to display the content of the current page.

{{< highlight html >}}
<html>
  <head>
    <title>Shubham's Blog</title>
  </head>
  <body>
    {{.Content}}
  </body>
</html>
{{< /highlight >}}

And awesome, I can see my contents as well.

{{< highlight bash >}}
curl http://localhost:1313/posts/designing-my-own-theme-in-hugo-i/ | head -n 10
{{< /highlight >}}

{{< highlight text >}}
<html>
  <head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>Shubham's Blog</title>
  </head>
  <body>
    <h2 id="hugo-is-all-about-themes">Hugo is all about themes</h2>
<p>Hugo is a developers dream of static sites.
Whether you are planning on a new blog site or maybe a documentation for a product, you can easily launch a static site using Hugo.</p>
<p>The most powerful feature of Hugo is its simplicity.
It is designed to separate your content from styling.
{{< /highlight >}}


## Summary {#summary}

This post allowed us to display the contents of our blogs.
We saw, how to design our layout for 3 basic types of pages, homepage, list page and single page.
We explored some of the GoLang's templating features and got a shallow understanding of contexts.
Next, let's make our blog more dynamic and good looking.
