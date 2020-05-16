---
title: "How to Redirect Default Netlify Subdomain to Custom Domain"
slug: "redirect-default-netlify-subdomain-to-custom-domain"
draft: false
date: 2020-05-01T04:25:15+07:00
tags: ["domain", "netlify", "hugo"]
images: []
toc: false
# description: string, if empty (substring main content)
description:
---
When you add custom domain to your netlify app, the \[your\].netlify.app not automatically redirect to your custom domain. 

To redirect default netlify subdomain to your custom domain, add new file <code>_redirects</code> and save to the root of your website, then fill the <code>_redirects</code> file with the code below.

{{< highlight markdown >}}
# Redirect default Netlify subdomain to primary domain

https://[your].netlify.app/* https://[your-domain].com/:splat 301!

# Example: https://budi.netlify.app/* https://budidev.com/:splat 301!
{{< /highlight >}}

In Hugo, save <code>_redirects</code> file to <code>static</code> folder.