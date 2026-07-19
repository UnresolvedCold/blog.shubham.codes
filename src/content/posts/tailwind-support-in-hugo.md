---
title: "Tailwind support in Hugo"
meta_title: ""
description: "With the version 0.128.0, Hugo started supporting Tailwind internally. In this post, let's configure Tailwind and display some text in red."
date: "2025-02-23T22:27:00+05:30"
categories: ["hugo"]
authors: ["Shubham Kumar"]
tags: ["learninghugo"]
draft: false
---
## Expectations from this post

With the version `0.128.0`, Hugo started supporting Tailwind internally.
In this post, let's configure Tailwind and display some text in red.


## Tailwind and other supporting apps

We will install the below 4 packages.

1.  tailwindcss - This is the core Tailwind library and is required for using tailwind
2.  tailwind/cli - This is a CLI tool for Tailwind that helps in building tailwind styles
3.  postcss - This is a library to process CSS with JavaScript plugins.
4.  autoprefixer - This is a postcss library that helps in automatically generating the vendor prefixes like `-webkit-` and `-moz-`.

We will install these packages as dev as they play no role after building the site.

```bash
npm install --save-dev tailwindcss @tailwindcss/cli postcss autoprefixer
```


## PostCSS config

You need to specify the plugins for `postcss`.
This can be done by creating a file, `postcss.config.js`.
You can add the plugins you want to use here as follows.

For now, we will add `tailwindcss` and `autoprefixer` as the plugins.

```javascript
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```


## Tailwind config

We can create a more advanced config for Tailwind later.

For now, let's just create a file, `tailwind.config` without any contents in the theme's root directory.


## Loading Tailwind on the index page

Let's first create a resource `main.css` in the assets directory of the theme.
Here we will import Tailwind and then we will load this resource in our index file using some Hugo magic.


### main.css

In the theme's root directory, let's create a directory `assets/css` and add a file `main.css` here.

The content of the file will just load the Tailwind library.

```css
@import "tailwindcss";
```


### index.html

Here, we just want to add `main.css` as our stylesheet.

This is done by using `link` tag.

First we want to load the resource then we want to process it using tailwind and add it to our page.

We can use Hugo's `with` function to load the file and again using `with`, we can process the obtained file using tailwind.
The below snippet will do the trick.

`{{ with resources.Get "css/main.css" }}` will try to get the main.css file. Hugo will look into the assets direcetry for `css/main.css`.
`{{ with . }}` will only be processed if the file was found.
And if found we can pipe the contents to be processed by `css.TailwindCSS` provided by Hugo.

```html
{{ with resources.Get "css/main.css" }}
    {{ with . | css.TailwindCSS }}
        <link rel="stylesheet" href="{{ .RelPermalink }}">
    {{ end }}
{{ end }}
```

This would be enough to start using Tailwind functionalities.

To test if it is working of not, we can add a simple text and use some tailwind features to make it red.

Inside the `index.html`, body let's add the following. Adding class as `text-red-500`, should turn the content of `<p>` to red.

```html
<p class="text-red-500">This paragraph is red.</p>
```


## Taking a peek

Let's first curl the homepage and verify of link was created successfully.

```bash
curl localhost:1313
```

```text
<html>
  <head>
	<meta name="generator" content="Hugo 0.144.2"><script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>
    <title>
      Shubham&#39;s corner
    </title>
        <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    <p class="text-red-500">This paragraph is red.</p>
  </body>
</html>
```

> The file main.css here is the processed main.css and will look very different than what we have written.

This is good, next let's see the actual site.
![](/ox-hugo/blog_tailwind_integration.png)

The rendered text is red which means we were finally able to load out Tailwind.


## Summary

In this post, we saw how to enable the support of Tailwind CSS in out Hugo site.
We added some text and turned it to red using Tailwind classes.
Next, we will explore code re-usability in Hugo which is where partials come to play.
