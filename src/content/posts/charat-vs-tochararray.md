---
title: charAt vs toCharArray
meta_title: charAt vs toCharArray
description: When charAt makes sense and when toCharArray makes sense
date: 2026-07-20T18:39:00.000+05:30
image: /images/uploads/chatgpt-image-jul-20-2026-06_41_36-pm.png
categories:
  - software
authors:
  - Shubham Kumar
tags:
  - java
draft: false
---
String as you know is immutable in java. When you try to manipulate a String object, Java creates a new String out of it. And object creation is expensive. There is a general rule, when you just want to read a character at any index use `charAt` and when you need to modify the string itself, like rearranging, sorting, creating sub string, breaking it into an array of characters using `toCharArray` is very cost efficient. 

`toCharArray` takes `O(n)` time for construction of array and `O(n)` space is also occupied. 
