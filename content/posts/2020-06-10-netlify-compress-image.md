---
title: "Netlify Compress Image"
slug: "netlify-compress-image"
draft: true
date: 2020-06-10T04:03:04+07:00
tags: []
images: []
toc: false
# description: string, if empty (substring main content)
description:
---
Generate URL

{{< highlight go-html-template >}}
WRONG
<img src="{{ .image | absURL }}"/>
  Output: https://example.com/images/example.jpg

RIGHT
<img src="{{ .image | relURL }}"/>
  Output: /images/example.jpg
{{</ highlight >}}          

File Name

{{< highlight go-html-template >}}
WRONG
/images/Example File Name.jpg

RIGHT
/images/example-file-name.jpg
{{</ highlight >}}          
