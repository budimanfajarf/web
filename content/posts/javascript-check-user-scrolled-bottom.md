---
title: "Check if a User Has Scrolled to the Bottom of Page Using Javascript"
slug: "javascript-check-user-scrolled-bottom-page"
draft: false
date: 2020-05-16T05:04:19+07:00
tags: ["javascript"]
images: []
toc: false
# description: string, if empty (substring main content)
description:
---
You can use this script to check if a user has scrolled to the bottom of page, for example to show header, show navigation/menu, show button "back to top", etc.

{{< highlight javascript >}}
window.addEventListener('scroll', function (event) {
  if (document.documentElement.scrollHeight == window.pageYOffset + window.innerHeight)  {
    alert('You are at the bottom of page!');
  }
});
{{< /highlight >}} 

For live example, scroll to the bottom of this page then you will see the header of this website slide up.