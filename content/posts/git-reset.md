---
author: "Budiman Fajar Firdaus"
title: "Git Reset to Previous Commit"
slug: "git-reset-previous-commit"
draft: false
date: 2020-06-11T07:23:55+07:00
tags: ["git"]
images: []
toc: false
# description: string, if empty (substring main content)
description:
home: true
---
## Find The Commit

Log all commit history

{{< highlight Terminfo >}}
git log
{{< /highlight >}} 

Then copy the previous hash commit you want to reset to it, <code>commit **&lt;hash&gt;**</code>.

## Hard Reset

Once you have the hash, do hard reset

{{< highlight Terminfo >}}
git reset --hard <hash>
{{< /highlight >}} 

Example: 

{{< highlight Terminfo >}}
git reset --hard 7e9c66afa4e45a3cc0bc6d56e67e0faea7aa3b72
{{< /highlight >}} 

## Push it

Then force push to remote branch

{{< highlight Terminfo >}}
git push -f <remote> <branch>
{{< /highlight >}}

Example:

{{< highlight Terminfo >}}
git push -f origin master
{{< /highlight >}}