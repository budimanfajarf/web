+++
date = 2020-04-11T19:28:12Z
description = ""
draft = true
images = []
tags = ["hugo", "netlify", "errors", "deploy"]
title = "Getting Errors Order Taxonomies when Deploy Hugo Site to Netlify"
toc = true

+++
A few days ago I got errors when deploy my blog (Hugo site) to Netlify

# Errors

Here's the pieces of errors :

    ...
    ...
    8:41:49 AM: ERROR 2020/05/03 01:41:49 render of "taxonomyTerm" failed: "/opt/build/repo/layouts/tags/terms.html:15:25": execute of template failed: template: tags/terms.html:15:25: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    8:41:49 AM: Total in 179 ms
    8:41:49 AM: Error: Error building site: failed to render pages: render of "taxonomyTerm" failed: "/opt/build/repo/layouts/_default/terms.html:15:20": execute of template failed: template: _default/terms.html:15:20: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    ...
    ...
    8:41:49 AM: Error running command: Build script returned non-zero exit code: 255
    8:41:49 AM: Failing build: Failed to build site
    8:41:49 AM: failed during stage 'building site': Build script returned non-zero exit code: 255
    8:41:49 AM: Finished processing build request in 14.990296865s

So, as usual I open new tab in browser to find solutions on the internet, and then after a while I found article from official Hugo website, here's the link: [taxonomy-templates](https://gohugo.io/templates/taxonomy-templates/ "Hugo taxonomy templates").

# Reason Errors

After reading the article, I found reason why I got errors when I deploy my site to Netlify.

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

So, my conclusion is that the **Hugo version on Netlify less than 0.55, while my local version is 0.69.2**, and the first code approuch above only available in Hugo 0.55 and later. That's why I got the errors.

# Solutions

Then whats the solutions?  If you have the same errors or simillar like I got, you can try 2 options.

First you can change the code like second code approuch above, so that can runs on Hugo version you running on Netlify.

Or you can do like what I do

Instead change the code, I prefer to add new file to my site, the file is `netlify.toml`. This file can **set Hugo version** and other setting for your environments in Netlify.

When I deploy my Hugo site to Netlify on the first time I don't create `netlify.toml`, but everything works fine until I customize layouts theme site to add list of terms taxonomies tags and then got the errors.

Because that errors, I decided to add `netlify.toml` to **ensure Hugo version** in Netlify has the same version with my local machine, so that can **reduce similar errors in the future** because different Hugo version.

Here's code in my `netlify.toml` file :

    [build]
    publish = "public"
    command = "hugo --gc --minify"
    
    [context.production.environment]
    HUGO_VERSION = "0.69.2"
    HUGO_ENV = "production"
    HUGO_ENABLEGITINFO = "true"
    
    [context.split1]
    command = "hugo --gc --minify --enableGitInfo"
    
    [context.split1.environment]
    HUGO_VERSION = "0.69.2"
    HUGO_ENV = "production"
    
    [context.deploy-preview]
    command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"
    
    [context.deploy-preview.environment]
    HUGO_VERSION = "0.69.2"
    
    [context.branch-deploy]
    command = "hugo --gc --minify -b $DEPLOY_PRIME_URL"
    
    [context.branch-deploy.environment]
    HUGO_VERSION = "0.69.2"
    
    [context.next.environment]
    HUGO_ENABLEGITINFO = "true"

Save `netlify.toml`file into your `root directory` Hugo site, and then push + re-deploy into Netlify, if everything works fine the errors should be gone and you can preview your site before publishing.

You can see the newest example `netlify.toml`on official Hugo website: [configure-hugo-version-in-netlify](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/#configure-hugo-version-in-netlify "configure-hugo-version-in-netlify")

> That's all, hope this help you :)

## Attachment

#### Deploy log before add `netlify.toml`

    8:41:32 AM: Build ready to start
    8:41:34 AM: build-image version: 2dbd444fcdce00cf06325060a8238d5ae3e86774
    8:41:34 AM: build-image tag: v3.3.7
    8:41:34 AM: buildbot version: d305548225ac57bb00eb5a596b0b8674e76a4681
    8:41:34 AM: Fetching cached dependencies
    8:41:34 AM: Starting to download cache of 119.6MB
    8:41:35 AM: Finished downloading cache in 604.32311ms
    8:41:35 AM: Starting to extract cache
    8:41:39 AM: Finished extracting cache in 4.285960043s
    8:41:39 AM: Finished fetching cache in 4.930258489s
    8:41:39 AM: Starting to prepare the repo for build
    8:41:40 AM: Preparing Git Reference refs/heads/master
    8:41:40 AM: Starting build script
    8:41:40 AM: Installing dependencies
    8:41:41 AM: Started restoring cached node version
    8:41:45 AM: Finished restoring cached node version
    8:41:46 AM: v10.20.1 is already installed.
    8:41:47 AM: Now using node v10.20.1 (npm v6.14.4)
    8:41:47 AM: Attempting ruby version 2.6.2, read from environment
    8:41:48 AM: Using ruby version 2.6.2
    8:41:48 AM: Using PHP version 5.6
    8:41:48 AM: Started restoring cached go cache
    8:41:48 AM: Finished restoring cached go cache
    8:41:48 AM: unset GOOS;
    8:41:48 AM: unset GOARCH;
    8:41:48 AM: export GOROOT='/opt/buildhome/.gimme/versions/go1.12.linux.amd64';
    8:41:48 AM: export PATH="/opt/buildhome/.gimme/versions/go1.12.linux.amd64/bin:${PATH}";
    8:41:48 AM: go version >&2;
    8:41:48 AM: export GIMME_ENV='/opt/buildhome/.gimme/env/go1.12.linux.amd64.env';
    8:41:48 AM: go version go1.12 linux/amd64
    8:41:48 AM: Installing missing commands
    8:41:48 AM: Verify run directory
    8:41:48 AM: Executing user command: hugo
    8:41:49 AM: Building sites …
    8:41:49 AM: ERROR 2020/05/03 01:41:49 render of "taxonomyTerm" failed: "/opt/build/repo/layouts/tags/terms.html:15:25": execute of template failed: template: tags/terms.html:15:25: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    8:41:49 AM: Total in 179 ms
    8:41:49 AM: Error: Error building site: failed to render pages: render of "taxonomyTerm" failed: "/opt/build/repo/layouts/_default/terms.html:15:20": execute of template failed: template: _default/terms.html:15:20: executing "main" at <.Page.Permalink>: can't evaluate field Page in type hugolib.OrderedTaxonomyEntry
    8:41:49 AM: Skipping functions preparation step: no functions directory set
    8:41:49 AM: Caching artifacts
    8:41:49 AM: Started saving pip cache
    8:41:49 AM: Finished saving pip cache
    8:41:49 AM: Started saving emacs cask dependencies
    8:41:49 AM: Finished saving emacs cask dependencies
    8:41:49 AM: Started saving maven dependencies
    8:41:49 AM: Finished saving maven dependencies
    8:41:49 AM: Started saving boot dependencies
    8:41:49 AM: Finished saving boot dependencies
    8:41:49 AM: Started saving go dependencies
    8:41:49 AM: Finished saving go dependencies
    8:41:49 AM: Error running command: Build script returned non-zero exit code: 255
    8:41:49 AM: Failing build: Failed to build site
    8:41:49 AM: failed during stage 'building site': Build script returned non-zero exit code: 255
    8:41:49 AM: Finished processing build request in 14.990296865s

#### Deploy log after add `netlify.toml`

    9:04:41 AM: Build ready to start
    9:04:47 AM: build-image version: 2dbd444fcdce00cf06325060a8238d5ae3e86774
    9:04:47 AM: build-image tag: v3.3.7
    9:04:47 AM: buildbot version: d305548225ac57bb00eb5a596b0b8674e76a4681
    9:04:47 AM: Fetching cached dependencies
    9:04:47 AM: Starting to download cache of 119.5MB
    9:04:48 AM: Finished downloading cache in 1.447053178s
    9:04:48 AM: Starting to extract cache
    9:04:53 AM: Finished extracting cache in 4.635581249s
    9:04:53 AM: Finished fetching cache in 6.108181019s
    9:04:53 AM: Starting to prepare the repo for build
    9:04:53 AM: Preparing Git Reference refs/heads/master
    9:04:54 AM: Found Netlify configuration file netlify.toml in site root
    9:04:54 AM: Found Netlify configuration file(s). Overriding site configuration
    9:04:54 AM: Different build command detected, going to use the one specified in the Netlify configuration file: 'hugo --gc --minify' versus 'hugo' in the Netlify UI
    9:04:54 AM: Starting build script
    9:04:54 AM: Installing dependencies
    9:04:55 AM: Started restoring cached node version
    9:04:59 AM: Finished restoring cached node version
    9:04:59 AM: v10.20.1 is already installed.
    9:05:00 AM: Now using node v10.20.1 (npm v6.14.4)
    9:05:00 AM: Attempting ruby version 2.6.2, read from environment
    9:05:01 AM: Using ruby version 2.6.2
    9:05:02 AM: Using PHP version 5.6
    9:05:02 AM: Installing Hugo 0.69.2
    9:05:03 AM: Hugo Static Site Generator v0.69.2-EC9DCF30/extended linux/amd64 BuildDate: 2020-04-24T07:57:53Z
    9:05:03 AM: Started restoring cached go cache
    9:05:03 AM: Finished restoring cached go cache
    9:05:03 AM: unset GOOS;
    9:05:03 AM: unset GOARCH;
    9:05:03 AM: export GOROOT='/opt/buildhome/.gimme/versions/go1.12.linux.amd64';
    9:05:03 AM: export PATH="/opt/buildhome/.gimme/versions/go1.12.linux.amd64/bin:${PATH}";
    9:05:03 AM: go version >&2;
    9:05:03 AM: export GIMME_ENV='/opt/buildhome/.gimme/env/go1.12.linux.amd64.env';
    9:05:03 AM: go version go1.12 linux/amd64
    9:05:03 AM: Installing missing commands
    9:05:03 AM: Verify run directory
    9:05:03 AM: Executing user command: hugo --gc --minify
    9:05:03 AM: Building sites …
    9:05:03 AM:                   |
    9:05:03 AM:  EN
    9:05:03 AM: -
    9:05:03 AM: ------------------+-----
    9:05:03 AM: Pages            | 43
    9:05:03 AM: Paginator pages  |  0
    9:05:03 AM:   Non-page files   |
    9:05:03 AM:  0
    9:05:03 AM:   Static files     | 16
    9:05:03 AM:   Processed images |
    9:05:03 AM:  0
    9:05:03 AM:   Aliases          |  1
    9:05:03 AM:   Sitemaps         |  1
    9:05:03 AM:   Cleaned          |  0
    9:05:03 AM: Total in 244 ms
    9:05:03 AM: Skipping functions preparation step: no functions directory set
    9:05:03 AM: Caching artifacts
    9:05:03 AM: Started saving pip cache
    9:05:03 AM: Finished saving pip cache
    9:05:03 AM: Started saving emacs cask dependencies
    9:05:03 AM: Finished saving emacs cask dependencies
    9:05:03 AM: Started saving maven dependencies
    9:05:03 AM: Finished saving maven dependencies
    9:05:03 AM: Started saving boot dependencies
    9:05:03 AM: Finished saving boot dependencies
    9:05:03 AM: Started saving go dependencies
    9:05:03 AM: Finished saving go dependencies
    9:05:03 AM: Build script success
    9:05:03 AM: Starting to deploy site from 'public'
    9:05:03 AM: Creating deploy tree 
    9:05:04 AM: Creating deploy upload records
    9:05:04 AM: 44 new files to upload
    9:05:04 AM: 0 new functions to upload
    9:05:05 AM: Starting post processing
    9:05:09 AM: Post processing done
    9:05:09 AM: Site is live
    9:05:26 AM: Finished processing build request in 39.584859143s