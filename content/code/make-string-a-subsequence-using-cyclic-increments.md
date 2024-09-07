+++
title = "Make String a Subsequence Using Cyclic Increments"
author = ["Shubham Kumar"]
date = 2024-09-07T17:56:00+05:30
categories = ["hugo"]
draft = false
+++

This is the LeetCode problem number [2825](https://leetcode.com/problems/make-string-a-subsequence-using-cyclic-increments/description/).


## Cyclic increment {#cyclic-increment}

This is when you increase an entity by an amount and when you reach the end you circle back to start and continue the count.
If `a` is increased cyclicly by 1, we will get `b`.
If `a` is increased cyclicly by 2, we will get `c`.
But if `z` is increased cyclicly by 1, we get `a`.
By `2` we will get `b`.

{{< highlight java >}}
String increaseCyclic (String str, int index) {
    char ch = str.charAt(index);
    char newch = (char) ((ch - 'a' + 1) % 26 + 'a');
    return str.substring(0, index) + newChar + str.substring(index + 1);
}
{{< /highlight >}}


## Subsequence {#subsequence}

String `str1` is said to contain the subsequence of `str2` if we can delete some characters from `str1` to get `str2`.
During this deletion we are not allowed to disturb the relative order of chars in the `str1`.

A code to check if `str1` contains subsequence `str2`.
We can iterate over all the characters of `str1` sequencely and check if all the letters are there as in `str2`.

{{< highlight java >}}
boolean isSubsequence(String str1, String str2) {
    int p1 = 0;
    int p2 = 0;
    while (p1 < str1.length() && p2 < str2.length()) {
        if (str1.charAt(p1) == str2.charAt(p2)) {
            p2++;
        }
        p1++;
    }
    return p2 == str2.length();
}
{{< /highlight >}}


## Solution {#solution}

The problem asks us that we are allowed to cyclic increase any number of chars in `str1`.
And check whether we are able to say `str1` will contain a subsequence of `str2`.

We can solve this problem by just merging both the problems.
Instead of checking just the characters equality, we can add an additional check on character of `str1` after increasig it cyclicly.

{{< highlight java >}}
public boolean canMakeSubsequence(String str1, String str2) {
    int p1 = 0;
    int p2 = 0;
    while (p1 < str1.length() && p2 < str2.length()) {
        char cyclicCh = (char) ((str1.charAt(p1) - 'a' + 1) % 26 + 'a');
        if (str1.charAt(p1) == str2.charAt(p2) || cyclicCh == str2.charAt(p2)) {
            p2++;
        }
        p1++;
    }
    return p2 == str2.length();
}
{{< /highlight >}}