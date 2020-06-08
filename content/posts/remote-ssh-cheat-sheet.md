---
title: "Remote SSH Cheat Sheet - Using Key"
slug: "remote-ssh-cheat-sheet"
draft: false
date: 2020-06-08T11:48:50+07:00
tags: []
images: []
toc: true
# description: string, if empty (substring main content)
description:
---
## Connecting to Remote Server
Format:
{{< highlight Terminfo >}}
ssh -i "/directory/your-key.pem" user@your-domain.com
{{< /highlight >}} 

Example:
{{< highlight Terminfo >}}
ssh -i "~/.ssh/budi.pem" ubuntu@ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com
{{< /highlight >}} 

<br/>

## Copy File from Remote Server to Local
Format:
{{< highlight Terminfo >}}
scp -i "/directory/your-key.pem" user@your-domain.com:/directory/server/example.txt /directory/local
{{< /highlight >}} 

Example:
{{< highlight Terminfo >}}
scp -i "~/.ssh/budi.pem" ubuntu@ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com:/etc/nginx/nginx.conf ~/Downloads
{{< /highlight >}} 

<br/>

## Copy Folder from Remote Server to Local
Format:
{{< highlight Terminfo >}}
scp -r -i "/directory/your-key.pem" user@your-domain.com:/directory/server/example /directory/local
{{< /highlight >}} 

Example:
{{< highlight Terminfo >}}
scp -r -i "~/.ssh/budi.pem" ubuntu@ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com:/etc/nginx ~/Downloads
{{< /highlight >}} 

<br/>

## VSCode Configuration File 
Format:
{{< highlight markdown >}}
Host <your-domain.com> or <name>
    User <user-name>
    HostName <your-domain.com>
    IdentityFile <your-key.pem>
{{< /highlight >}}

Example:
{{< highlight markdown >}}
Host aws-ubuntu
    User ubuntu
    HostName ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com
    IdentityFile ~/.ssh/budi.pem
{{< /highlight >}}

<br />

