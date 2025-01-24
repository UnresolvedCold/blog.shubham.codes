+++
title = "Julia and basic matrix operations"
author = ["Shubham Kumar"]
date = 2025-01-24T05:14:00+05:30
tags = ["julia", "linear-algebra", "matrix"]
categories = ["hugo"]
draft = true
+++

## What is Julia? {#what-is-julia}

Julia is a scientific programming language.
It is close to R and Python in syntax and scripting feel.
But it is more like a light weight MATLAB.

I was going with [Gilbert Strang's lectures on Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-1-the-geometry-of-linear-equations/) and as always, you can't learn if you are not experimenting.
I searched for any language support for MATLAB in Doom Emacs.
Instead I saw this - `;;julia ; a better, faster MATLAB`.

And my curious mind was like - Why not give this a try?
And here I am.

I am not a Julia developer yet.
Maybe I'll be one, given the feel of the language.
Maybe I'll start saying Julia instead of MATLAB in some days.

Let the future be what it will be.
Here are some basic matrix operations you can perform in Julia.


## Installation {#installation}

I am using Ubuntu on WSL2 hosted on Windows 11.
And the following worked for me.

{{< highlight bash >}}
wget https://julialang-s3.julialang.org/bin/linux/x64/1.8/julia-1.8.1-linux-x86_64.tar.gz
tar zxvf julia-1.8.1-linux-x86_64.tar.gz

# maybe move it to your home directory
mv julia-1.8.1 ~/julia
{{< /highlight >}}


### Export {#export}

{{< highlight nil >}}
# ~/.bashrc or ~/.zshrc
export PATH="$PATH:/home//julia/bin"
{{< /highlight >}}


## Julia Linear Algebra {#julia-linear-algebra}

For linear algebra operations, Julia has a library called `LinearAlgebra`.
Just like Python where you import your libraries, here you use using keyword.

You can define a matrix very easily as below.
Let's say you want to define a matrix \\(A = \begin{bmatrix} 1 & 2 & 3 \\\ 4 & 1 & 6 \\\ 7 & 8 & 1 \end{bmatrix}\\).
You can just write the elements of a row separated by space and a new row is specified by semi-colon.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2 3; 4 1 6; 7 8 1]
{{< /highlight >}}

{{< highlight text >}}
: 3×3 Matrix{Int64}:
:  1  2  3
:  4  1  6
:  7  8  1
{{< /highlight >}}


## Basic Operations {#basic-operations}

The operations like finding the trace (tr) or determinant (det) or rank or inverse (inv) can be easily done as follows.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2 3; 4 1 6; 7 8 1]

tr(A)
det(A)
rank(A)
inv(A)
{{< /highlight >}}

{{< highlight text >}}
3×3 Matrix{Int64}:
 1  2  3
 4  1  6
 7  8  1

// Trace
3

// Determinant
104.0

// Rank
3

// Inverse
3×3 Matrix{Float64}:
 -0.451923   0.211538    0.0865385
  0.365385  -0.192308    0.0576923
  0.240385   0.0576923  -0.0673077
{{< /highlight >}}

Calculation of Eigen values and Eigen vectors are also very easy.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2 3; 4 1 6; 7 8 1]
eigvals(A)
eigvecs(A)
{{< /highlight >}}

{{< highlight text >}}
3×3 Matrix{Int64}:
 1  2  3
 4  1  6
 7  8  1

// Eigen values
3-element Vector{Float64}:
 -6.214612641961068
 -1.5540265964847833
 10.768639238445843

// Eigen vectors
3×3 Matrix{Float64}:
 -0.175709  -0.766257  -0.344989
 -0.570057   0.587185  -0.589753
  0.802596   0.26089   -0.730188
{{< /highlight >}}

There are different ways you can factorize a matrix and you can do this in Julia as well.


### LU Factorization {#lu-factorization}

LU factorization basically factorizes a matrix A as LU, where L is lower triangular matrix and U is upper triangular matrix.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2; 4 5];
LU=lu(A)
{{< /highlight >}}

{{< highlight text >}}
2×2 Matrix{Int64}:
 1  2
 4  5
LinearAlgebra.LU{Float64, Matrix{Float64}, Vector{Int64}}
L factor:
2×2 Matrix{Float64}:
 1.0   0.0
 0.25  1.0
U factor:
2×2 Matrix{Float64}:
 4.0  5.0
 0.0  0.75
{{< /highlight >}}


### Eigen value decomposition {#eigen-value-decomposition}

A matrix can be factorized as \\(S\Lambda S^{-1}\\) where \\(S\\) is the Eigen vector matrix and \\(\Lambda\\) is the Eigen values in diagonal matrix.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2; 4 5];
E=eigen(A)
{{< /highlight >}}

{{< highlight text >}}
2×2 Matrix{Int64}:
 1  2
 4  5
Eigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}
values:
2-element Vector{Float64}:
 -0.4641016151377544
  6.464101615137754
vectors:
2×2 Matrix{Float64}:
 -0.806898  -0.343724
  0.59069   -0.939071
{{< /highlight >}}


### SVD {#svd}

SVD or Singular Value Decomposition is a way to factorize a matrix in \\(u\Sigma v\\) form where \\(u\\) and \\(v\\) are some special vectors and \\(\Sigma\\) is a special matrix.

Going in detail about them would only make this blog grow infinitely.

Maybe I should consider writing blogs on mathematical learning in future.

{{< highlight julia >}}
using LinearAlgebra
A = [1 2; 4 5];
SVD=svd(A)
{{< /highlight >}}

{{< highlight text >}}
2×2 Matrix{Int64}:
 1  2
 4  5
LinearAlgebra.SVD{Float64, Float64, Matrix{Float64}, Vector{Float64}}
U factor:
2×2 Matrix{Float64}:
 -0.324536  -0.945873
 -0.945873   0.324536
singular values:
2-element Vector{Float64}:
 6.767828935632369
 0.44327361529561016
Vt factor:
2×2 Matrix{Float64}:
 -0.606994  -0.794707
  0.794707  -0.606994
{{< /highlight >}}


## Conclusion {#conclusion}

Julia has much more to offer.
This blog was a basic introduction to Julia in Linear Algebra.
I will keep sharing as I explore more of this language.
