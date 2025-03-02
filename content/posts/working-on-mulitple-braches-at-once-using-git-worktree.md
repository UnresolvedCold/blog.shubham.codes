+++
title = "Working on mulitple braches at once using git worktree"
author = ["Shubham Kumar"]
date = 2025-03-02T20:20:00+05:30
categories = ["hugo"]
draft = false
+++

## Working on multiple branches at once {#working-on-multiple-branches-at-once}

Git worktree enables you to have multiple working directories linked to the same repository.
Each directory can have its own branch checked out.
And you can edit the code for each feature without changing or stashing the changes you did on each branch.


## Worktree creation {#worktree-creation}

The following command will create a new directory, `debug` with `branch1` checked out.

You can browse the `../debug` directory and change the code as per your development for `branch1`.

{{< highlight bash >}}
git worktree add ../debug branch1
{{< /highlight >}}

{{< highlight bash >}}
pwd
echo somenewfeature on branch 1 > somenewfeature
cat somenewfeature
{{< /highlight >}}

```text
/home/cold/Projects/Personal/gitworktreedemo/debug
somenewfeature on branch 1
```

In the meanwhile you can keep editing the root directory with the `main` branch.

{{< highlight bash >}}
pwd
echo somenewfeature on main 1 > somenewfeatureonmain
cat somenewfeatureonmain
{{< /highlight >}}

```text
/home/cold/Projects/Personal/gitworktreedemo/main
somenewfeature on main 1
```

You can run the git commands going inside each directory.

{{< highlight bash >}}
pwd
git add .
git status
{{< /highlight >}}

```text
/home/cold/Projects/Personal/gitworktreedemo/main
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   somenewfeatureonmain
```

{{< highlight bash >}}
pwd
git add .
git status
{{< /highlight >}}

```text
/home/cold/Projects/Personal/gitworktreedemo/debug
On branch branch1
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   somenewfeature
```


## List existing worktrees {#list-existing-worktrees}

You can list your worktrees from the `main` as well as the `debug` directories.

{{< highlight bash >}}
git worktree list
{{< /highlight >}}

```text
/home/cold/Projects/Personal/gitworktreedemo/main   e0ccbca [main]
/home/cold/Projects/Personal/gitworktreedemo/debug  42ad28a [branch1]
```


## Remove a worktree {#remove-a-worktree}

When you are finally done with the feature branch, you can delete the worktree using `remove` command.

{{< highlight bash >}}
git worktree remove ../debug
ls ..
git worktree list
{{< /highlight >}}

```text
main
/home/cold/Projects/Personal/gitworktreedemo/main  e0ccbca [main]
```

Any commit you did on the feature branch will automatically be reflected in the main codebase.

{{< highlight bash >}}
git checkout branch1
git log --oneline
{{< /highlight >}}

```text
A	somenewfeatureonmain
82cad2d done
42ad28a A commit on branch1
e0ccbca A commit on main
```


## Advice on working with worktrees {#advice-on-working-with-worktrees}

> As the new directory will not be ignored by default, it is best to create your worktree directories out of git root

The way I create my worktrees is I create a new directory with project name.
Then I clone my actual repository inside this directory and keep my worktrees on the same level as project.

For example, my main project is cloned inside main directory and I created debug directory in the same level as main.

{{< highlight bash >}}
tree .
{{< /highlight >}}

```text
.
├── debug
│   └── somenewfeature
└── main
    └── somenewfeatureonmain

2 directories, 2 files
```
