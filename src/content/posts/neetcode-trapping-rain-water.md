---
title: "[Neetcode] Trapping Rain Water"
meta_title: Trapping Rain Water
description: "Draft notes for solving Trapping Rain Water from brute force, to precomputed walls, to the two pointer solution."
date: 2026-07-26
image: "/images/uploads/trapping-rain-water-03-two-pointer-settle.gif"
categories:
  - "code"
authors:
  - Shubham Kumar
tags:
  - "neetcode"
  - "hard"
draft: false
---

This is one of those problems where the formula is simple, but the trick is figuring out how much context each index needs.

For any bar at index `i`, the water on top of it is:

```text
min(max wall on left, max wall on right) - height[i]
```

If either side does not have a higher wall, the contribution becomes `0`.

## Problem

Given an array `height`, each value represents the height of a bar. We need to return how much water can be trapped after raining.

Example:

```text
height = [0,2,0,3,1,0,1,3,2,1]
answer = 9
```

## Approach 1 - Brute force

For every index, scan the full left side and full right side to find the tallest wall on both sides. Then add the water contributed by the current index.

![](/images/uploads/trapping-rain-water-01-brute-force-wall-scan.gif "medium center")

This works because every index is handled independently, but it repeats a lot of work. For each bar we are scanning the array again.

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            int leftWall = i;
            int rightWall = i;

            for (int k = i; k >= 0; k--) {
                if (height[k] >= height[leftWall]) {
                    leftWall = k;
                }
            }

            for (int k = i; k < n; k++) {
                if (height[k] > height[rightWall]) {
                    rightWall = k;
                }
            }

            res += Math.min(height[leftWall], height[rightWall]) - height[i];
        }

        return res;
    }
}
```

Time complexity: `O(n^2)`

Space complexity: `O(1)`

## Approach 2 - Prefix and suffix walls

The repeated work in brute force is finding the same left and right walls again and again. We can precompute them.

`leftWalls[i]` stores the highest wall from `0` to `i`.

`rightWalls[i]` stores the highest wall from `i` to `n - 1`.

![](/images/uploads/trapping-rain-water-02-prefix-suffix-walls.gif "medium center")

Once these two arrays are ready, the water at every index can be calculated in one pass.

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int res = 0;

        int[] leftWalls = new int[n];
        int[] rightWalls = new int[n];

        leftWalls[0] = height[0];
        rightWalls[n - 1] = height[n - 1];

        for (int i = 1; i < n; i++) {
            leftWalls[i] = Math.max(leftWalls[i - 1], height[i]);
        }

        for (int i = n - 2; i >= 0; i--) {
            rightWalls[i] = Math.max(rightWalls[i + 1], height[i]);
        }

        for (int i = 0; i < n; i++) {
            res += Math.min(leftWalls[i], rightWalls[i]) - height[i];
        }

        return res;
    }
}
```

Time complexity: `O(n)`

Space complexity: `O(n)`

## Approach 3 - Two pointers

We can avoid the extra arrays by keeping two pointers, one from the left and one from the right.

The useful observation is that water is limited by the smaller wall. If `leftMax < rightMax`, then the left side can be settled because there is already a right wall tall enough to support it. Similarly, if `rightMax < leftMax`, the right side can be settled.

![](/images/uploads/trapping-rain-water-03-two-pointer-settle.gif "medium center")

```java
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int res = 0;

        int l = 0;
        int r = n - 1;
        int leftMax = 0;
        int rightMax = 0;

        while (l < r) {
            leftMax = Math.max(leftMax, height[l]);
            rightMax = Math.max(rightMax, height[r]);

            if (leftMax > rightMax) {
                res += rightMax - height[r];
                r--;
            } else {
                res += leftMax - height[l];
                l++;
            }
        }

        return res;
    }
}
```

Time complexity: `O(n)`

Space complexity: `O(1)`

## Takeaway

The core idea is that each index only cares about the smaller wall between its best left wall and best right wall. Brute force finds those walls by scanning again and again. Prefix/suffix arrays remember them. Two pointers settle the side whose limit is already known.
