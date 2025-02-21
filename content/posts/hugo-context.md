+++
title = "Hugo context"
author = ["Shubham Kumar"]
date = 2025-02-21T06:26:00+05:30
categories = ["hugo"]
draft = false
series = "learninghugo"
+++

## What we did and what we will do? {#what-we-did-and-what-we-will-do}

Previously, we were successfully able to render our home, single and list pages.
When we started templating, we looked into a term called, `context`.
We worked with site context and page context and I assumed they are just like references.
This post is meant to explore more on `context` and get a deeper understanding.


## Context {#context}

The Context is the object available to you at anytime.
This means, if you are in a single page then the context available to you will be the contents of the page, it's title and other related information.
On one of the list pages, the context will contain a collection of items.


### Title and Contents {#title-and-contents}

There are some page related contexts like `.Title` and `.Contents` which can be used form any one of the layouts.
I can change the `index.html` or `single.html` or `list.html` and print the title and contents.
I do not have any content in my home page and lists pages right now, so the body will be blank.
But for, any one of the blogs we can check the contents being rendered.

{{< highlight html >}}
<html>
  <head>
    <title>
      {{ .Title }}
    </title>
  </head>
  <body>
    {{ .Content }}
  </body>
</html>
{{< /highlight >}}

{{< highlight bash >}}
curl http://localhost:1313/posts/designing-my-own-theme-in-hugo-ii/ | head -n 10
{{< /highlight >}}

{{< highlight text >}}
<html>
  <head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>
      Designing my own theme in Hugo - II
    </title>
  </head>
  <body>
    <h2 id="what-we-did-and-what-we-will-do">What we did and what we will do?</h2>
<p>This is a part blog in which I am documenting my learning process of creating my own theme in Hugo.
Previously, we went through the basic flow of creating a theme.
{{< /highlight >}}


### Accessing the site contexts {#accessing-the-site-contexts}

If you want to access the site related information, like the title for your site or any property defined for your site in `config.toml`, you can use the `.Site` context.
Basically, each page contains a data related to your site inside `{{ .Site }}` object.

Changing the title to `{{ .Site.Title }}` started displaying me the site's name, which is `Shubham's corner`.

{{< highlight html >}}
<html>
  <head>
    <title>
      {{ .Site.Title }}
    </title>
  </head>
  <body>
    {{ .Content }}
  </body>
</html>
{{< /highlight >}}

{{< highlight bash >}}
curl http://localhost:1313/posts/designing-my-own-theme-in-hugo-ii/ | head -n 10
{{< /highlight >}}

{{< highlight text >}}
<html>
  <head><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>
      Shubham&#39;s corner
    </title>
  </head>
  <body>
    <h2 id="what-we-did-and-what-we-will-do">What we did and what we will do?</h2>
<p>This is a part blog in which I am documenting my learning process of creating my own theme in Hugo.
Previously, we went through the basic flow of creating a theme.
{{< /highlight >}}


### Change of contexts {#change-of-contexts}

There are certain functions which changes the current context.
If we want to iterate over all the pages in page list.
Then you use `range` method.
The `range` method provides you an iterator for you collection.

If I want to display the title of all the collections in my posts.
I can provide a `range` block as follows.

{{< highlight html >}}
<body>
  {{ range .Pages }}
  {{ end }}
</body>
{{< /highlight >}}

`.Pages` provides me a collection of page objects for each of the pages in the list.
In between the blocks, my context is changed to the currently iterated page.

This means, calling `.Title` in b/w the blocks will render the title of pages in collection one-by-one.

{{< highlight html >}}
<body>
  <ul>
  {{ range .Pages }}
  <li>{{ .Title }}</li>
  {{ end }}
  </ul>
</body>
{{< /highlight >}}

{{< highlight bash >}}
curl http://localhost:1313/posts/
{{< /highlight >}}

{{< highlight text >}}
<html>
  <body>
    <ul>

    <li>Hugo context</li>

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

You can still access the global contexts by using the `$` symbol.

`$.Title` will refer to the title of this page.

`$.Site.Title` will refer to the site's title.

{{< highlight html >}}
 <li>{{ $.Site.Title }} - {{ $.Title }} - {{ .Title }}</li>
{{< /highlight >}}

{{< highlight bash >}}
curl http://localhost:1313/posts/
{{< /highlight >}}

{{< highlight text >}}
<html>
  <body>
    <ul>

    <li>Shubham&#39;s corner - Posts - Hugo context</li>

    <li>Shubham&#39;s corner - Posts - Designing my own theme in Hugo - II</li>

    <li>Shubham&#39;s corner - Posts - Designing my own theme in Hugo - I</li>

    <li>Shubham&#39;s corner - Posts - Julia and basic matrix operations</li>

    <li>Shubham&#39;s corner - Posts - AOP in pure Java, keeping logging simple and aside</li>

    <li>Shubham&#39;s corner - Posts - Object pool design pattern in Java</li>

    <li>Shubham&#39;s corner - Posts - Downloading a single file from 2 independent apps</li>

    <li>Shubham&#39;s corner - Posts - Syncing org roam files across devices in WSL2 environment with better performance</li>

    <li>Shubham&#39;s corner - Posts - Reflection API in Java</li>

    </ul>
  </body>

</html>
{{< /highlight >}}


## Summary {#summary}

In this post, we explored in depth on contexts.
We saw, `{{ . }}` refers to the current context.
For pages, the context provides the title and other related information.
We also witnessed the change of context while using `range` function and also used `$` symbol to get the global context.
Next, we will explore styling the site using CSS.
