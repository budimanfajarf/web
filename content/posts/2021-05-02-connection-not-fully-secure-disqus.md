---
title: "Connection not Fully Secure (Disqus)"
slug: "connection-not-fully-secure-disqus"
draft: false
date: 2021-05-02T03:27:04+07:00
tags: []
images: [
    "/uploads/2021-05-02-not-fully-secure.webp"
]
featuredImg: "/uploads/2021-05-02-not-fully-secure.webp"
toc: false
# description: string, if empty (substring main content)
description:
home: true
---

{{< figure src="/uploads/2021-05-02-not-fully-secure.webp" caption="Connection not fully secure" class="normal" >}}

I got some part of my site showing <u>*_not fully secure_*</u> as shown in the image above. After tracking the issue, I found this is because of Disqus. If you face the same issue, you can try this solution

1. Go to your Disqus account
2. Click Setting Gear -> Admin
3. Click Edit Settings -> Choose your site
4. Click Advanced -> Disable Tracking

{{< figure src="/uploads/2021-05-02-disable-tracking-disqus.webp" caption="Disable disqus tracking" class="normal" >}}