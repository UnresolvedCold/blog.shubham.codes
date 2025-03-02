+++
title = "Displaying full content in rss.xml in Hugo"
author = ["Shubham Kumar"]
date = 2025-03-02T19:20:00+05:30
categories = ["hugo"]
draft = false
series = "learninghugo"
+++

Create a new file at `layouts/_default/rss.xml`.
You can define your `rss.xml` as per your liking.

By default `rss.xml` only displays the summary of your articles.
But I want to display the whole content.
This helps me in syncing my posts with my `dev.to` site.

You can find the Hugo's default `rss.xml` at [Hugo's Github repo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml).
Let's copy the contents to our `rss.xml` file that we just created.

Then change the `description` to show content instead of summary as follows.

{{< highlight diff >}}
-<description>{{ .Summary | transform.XMLEscape | safeHTML }}</description>
+<description>{{ .Content | transform.XMLEscape | safeHTML }}</description>
{{< /highlight >}}

Before the changes there were only 504 characters in the characters.

{{< highlight bash >}}
curl localhost:1313/index.xml | grep "description" | head -n 3 | tail -n 1 | wc -c

: 504
{{< /highlight >}}

After the changes the number of characters increased significantly as the whole blog is being rendered in the description.

{{< highlight bash >}}
curl localhost:1313/index.xml | grep "description" | head -n 3 | tail -n 1 | wc -c

: 14582
{{< /highlight >}}
