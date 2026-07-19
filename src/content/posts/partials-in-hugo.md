---
title: "Partials in Hugo"
meta_title: ""
description: "Hugo provides a nice mechanism to separate your components and stitch them at different places. This means you can design your components like nav-bar or men..."
date: "2025-02-25T20:09:00+05:30"
categories: ["hugo"]
authors: ["Shubham Kumar"]
tags: ["learninghugo"]
draft: false
---
## Partials and code reusability

Hugo provides a nice mechanism to separate your components and stitch them at different places.
This means you can design your components like nav-bar or menu bar and stitch them in all of your layouts.
Earlier, we wrote some code to load tailwind in our index page.
But we do not want to write this boilerplate code for all our pages.
Instead we should have defined the tailwind loader code in a component and call it from all the layouts.
Actually, we should have called the boilerplate code from `baseof.html` from which all other layouts are inherited.


## baseof.html

When we created the theme, a special file was created for us, `baseof.html`.
Every other layout inherits `baseof.html`.

If you look at the contents of `baseof.html` which was generated for use.
You will find 3 partial sections, head, header and footer.
These are the default standards but you will go on creating partials as your code base becomes more complex.

The main block denoted by `{{ block "main" . }}`, is where your content from other pages will be inserted.
You can define your layout as main in other layout files and that block will be inserted here.

```html
<!DOCTYPE html>
<html>
    {{- partial "head.html" . -}}
    <body>
        {{- partial "header.html" . -}}
        <div id="content">
        {{- block "main" . }}{{- end }}
        </div>
        {{- partial "footer.html" . -}}
    </body>
</html>
```

> You can ignore the dashed infront and at last of the decalrations. These are the guide for Hugo to trim spaces infront and back.


## head.html

After `html` tag we have a partial `head.html` instead of a head tag.
Hugo is smart enough to generate `head` attribute from the partial.
Looking closely, it just process your partials and replaces the partial block with it.

We could have defined out tailwind loading code here as follows.
Now we got the support for tailwind everywhere in our site.
You can also define some meta tags or other libraries here.

```html
<head>
  {{ with resources.Get "css/main.css" }}
  {{ with . | css.TailwindCSS }}
      <link rel="stylesheet" href="{{ .RelPermalink }}">
  {{ end }}
  {{ end }}
</head>
```


## Defining custom partials

Defining partials is as easy as it can be.
You just need to create a file under `partials` directory.
And write whatever processing you want to do.
And include it in you main layout using `{{ partial "your-file.html" . }}`.
You can pass any data along with your partial definition.
In the above partial definition, we are passing the current context to our partial.


## Make CSS styling a partial

Let's create a new partial by creating a file called `css.html`.
This will contain the logic to process and import our tailwind libraray.

The contents of `css.html` will be as follows.

```html
{{ with resources.Get "css/main.css" }}
{{ with . | css.TailwindCSS }}
    <link rel="stylesheet" href="{{ .RelPermalink }}">
{{ end }}
{{ end }}
```

And our head block will include this as a partial as follows.
The below code goes inside `baseof.html`.

```html
<head>
  {{ partial "css.html" . }}
</head>
```


## Modify the pages to use baseof

You will need to define the `main` block in all your layouts.
This will help Hugo to link the contents of layouts page and combine it with baseof to generate the rendered page.

Below is how, I modified my `index.html` page.

```html
{{ define "main" }}
  <p class="text-red-500">This paragraph is red.</p>
  {{ .Content }}
{{ end }}
```

```bash
curl localhost:1313 | grep "main.css"
```

```text
:         <link rel="stylesheet" href="/css/main.css">
```

This looks as expected. We can see out main.css linked to our homepage.

Now let's modify the `list.html` layout and define main here as well.

```html
{{ define "main" }}
  <ul>
    {{ range .Pages }}
    <li>{{ $.Site.Title }} - {{ $.Title }} - {{ .Title }}</li>
    {{ end }}
  </ul>
{{ end }}
```

```bash
curl localhost:1313/posts/ | grep "main.css"
```

```text
:         <link rel="stylesheet" href="/css/main.css">
```

Awesome, we can now use tailwind from anywhere in our website.


## Summary

In this post we explored partials which is basically a way of reusing the code in Hugo.
We learned about `baseof.html` which is inherited by all the layouts.
We combined our tailwind learning with partials and created a `css.html` partial which can now be used from anywhere.
