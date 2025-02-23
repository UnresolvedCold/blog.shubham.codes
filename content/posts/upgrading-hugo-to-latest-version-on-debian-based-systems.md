+++
title = "Upgrading Hugo to latest version on Debian based systems"
author = ["Shubham Kumar"]
date = 2025-02-23T21:29:00+05:30
tags = ["hugo", "upgrade", "ubuntu"]
categories = ["hugo"]
draft = false
+++

There is a bad news for Ubuntu (or any Debian based OS) user if you have installed Hugo using `apt`.
The official `apt` repository is not being updated continuously.

Today, I wanted to experiment with the Tailwind support introduced in Hugo `0.128.0`.
But the apt package manager does not has this version.
The latest version is `0.92.2` as of now.

{{< highlight bash >}}
apt list -a hugo
{{< /highlight >}}

{{< highlight text >}}
: Listing...
: hugo/jammy-updates,jammy-security,now 0.92.2-1ubuntu0.1 amd64 [installed]
: hugo/jammy 0.92.2-1 amd64
{{< /highlight >}}

In such scenarios, you can install the `.deb` file directly from the published releases.
The disadvantage of this method is, you will lose the ability to upgrade the version automatically.
In the future, you will be restricted to download the `deb` file and install the updated version.

Anyways, here are the steps to do so.

First look for the latest (or the version you want) to install at the GoHugoIO release page - <https://github.com/gohugoio/hugo/releases>

At the time of writing this post, the latest version is `0.144.2`.
Any my current version is `0.92.2`.

{{< highlight bash >}}
hugo version
{{< /highlight >}}

{{< highlight text >}}
: hugo v0.92.2+extended linux/amd64 BuildDate=2023-01-31T11:11:57Z VendorInfo=ubuntu:0.92.2-1ubuntu0.1
{{< /highlight >}}

From the Downloads directory, I can run the below command to download the deb file that I want to install.
You can use any directory to download this file. Generally people use `/tmp`, but I like all my downloads in my `Downloads` directory.

{{< highlight bash >}}
wget https://github.com/gohugoio/hugo/releases/download/v0.144.2/hugo_0.144.2_linux-amd64.deb
{{< /highlight >}}

Next you can install the `deb` file as follows.

{{< highlight bash >}}
ls | grep hugo
{{< /highlight >}}

{{< highlight text >}}
: hugo_0.144.2_linux-amd64.deb
{{< /highlight >}}

{{< highlight bash >}}
dpkg -i hugo_0.144.2_linux-amd64.deb
{{< /highlight >}}

This should upgrade your installation to latest.

{{< highlight bash >}}
hugo version
{{< /highlight >}}

{{< highlight text >}}
: hugo v0.144.2-098c68fd18f48031a7145bedab30cbaede48858f linux/amd64 BuildDate=2025-02-19T12:17:04Z VendorInfo=gohugoio
{{< /highlight >}}

Hope this will help you upgrading Hugo to latest version on Debian based systems.
