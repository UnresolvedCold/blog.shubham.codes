---
title: "[Neetcode] Two Integer Sum II"
meta_title: Two Integer Sum II
description: "Solving Two Integer Sum II, basically you have a sorted array and
  you need to find two numbers that will sum up to the target given. "
date: 2026-07-24T02:24:00.000+05:30
image: /images/uploads/5341f9ef-d579-494e-bd27-1621b75db549-.png
categories:
  - code
authors:
  - Shubham Kumar
tags:
  - neetcode
  - medium
draft: false
---
Basically you have a sorted array of integers and you need to find the index i, j which will sum up to a target.

## Approach 1 - Bruteforce

The simplest solution is loop through all the integers combinations and find the indices. This is basically looping twice each number -> O(n^2), not very good.

![](/images/uploads/01-brute-force-pairs.gif)

We can make the above one more optimal by starting the second loop after the current index. This will reduce our iterations by half, making it n(n-1)/2. This is also O(n^2).

![](/images/uploads/02-look-ahead-pairs.gif)

We can add one more optimization by pruning as soon as second loop sums to a number greater than target. As the array is sorted, any number after the number which resulted in sum greater than target will also result in a sum greater than the target. Worst case this will also be O(n^2).

![](/images/uploads/03-sorted-pruning.gif)

But we got a clue here, the clue is traversing in reverse order if we get a sum less than target then we no longer need to search a number before the index.

Basically, if sum of 1st and last is less than the target, then good guess would be check the 2nd number and last number. And if 1st and lat is greater than the target, then a good guess would be check 1st and 2nd last. And so on. 

## Approach 2 - 2 pointers

Take 2 pointers, l at the start of the array and r at the last of the array. If the sum of numbers at the pointers is greater than target then check r-1 and if it is less than the target then check l+1. This will give us a solution which is O(n) as none of the numbers are being passed more than once. 

![](/images/uploads/05-two-pointer-walkthrough.gif)
