+++
date = 2020-05-08T19:28:12Z
description = ""
draft = true
images = []
tags = ["hugo", "netlify", "deploy", "errors"]
title = "Getting Errors Order Taxonomies when Deploy Hugo Site to Netlify"
toc = false

+++
A few days ago I got errors when deploy my blog (hugo site) to netlify

## Errors

Here's the piece of errors :

    .....
    8:41:49 AM: ERROR 2020/05/03 01:41:49 render of "taxonomyTerm" failed: "/opt/build/repo/layouts/tags/terms.html:15:25": execute of template failed: template: tags/terms.html:15:25: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    8:41:49 AM: Total in 179 ms
    8:41:49 AM: Error: Error building site: failed to render pages: render of "taxonomyTerm" failed: "/opt/build/repo/layouts/_default/terms.html:15:20": execute of template failed: template: _default/terms.html:15:20: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    ...
    ...
    8:41:49 AM: Error running command: Build script returned non-zero exit code: 255
    8:41:49 AM: Failing build: Failed to build site
    8:41:49 AM: failed during stage 'building site': Build script returned non-zero exit code: 255
    8:41:49 AM: Finished processing build request in 14.990296865s

So, as usual I open new tab in browser to find solutions on the internet, and then after a while I found article from Hugo official website, here's the link: [https://gohugo.io/templates/taxonomy-templates/](https://gohugo.io/templates/taxonomy-templates/ "https://gohugo.io/templates/taxonomy-templates/")

## Reason Errors

After reading the article, I found reason why I getting errors when I deploy my site.

Code below the reason why I getting the errors:

    {{ range .Data.Terms.Alphabetical }}
    	<li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
    {{ end }}

Order Taxonomies with the approach above is **only available in Hugo 0.55 and later**

Before the version 0.55 you would have to do something like:

    {{ $type := .Type }}
    {{ range $key, $value := .Data.Terms.Alphabetical }}
    	{{ $name := .Name }}
    	{{ $count := .Count }}
    	{{ with $.Site.GetPage (printf "/%s/%s" $type $name) }}
    		<li><a href="{{ .Permalink }}">{{ $name }}</a> {{ $count }}</li>
    	{{ end }}
    {{ end }}

So my conclusion is that the **Hugo version on my netlify less than 0.55, while my local version is 0.62**, and the code above only available in Hugo 0.55 and later. That's why I got the errors.

## Solutions

So, whats the solutions?  If you have the same errors or simillar like I got, you can try 2 options.

First you can change the code like example above, so that can runs on Hugo version you running on Netlify.

Or you can do like what I do

Instead change the code I prefer to add new file to my site, the file is <code>netlify.toml</code>