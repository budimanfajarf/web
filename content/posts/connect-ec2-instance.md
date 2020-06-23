---
title: "Access Amazon Elastic Compute Cloud (EC2) Remotely via SSH"
slug: "connect-aws-ec2-remote-ssh"
draft: false
date: 2020-06-22T13:09:43+07:00
tags: ["aws", "cloud", "ssh"]
images: [
  "/uploads/2020-06-16-connect-instance-04-terminal-ubuntu.jpg",
  "/uploads/2020-06-16-connect-instance-05-success-connect.webp",
  "/uploads/2020-06-16-connect-instance-03-connect-info.webp"
]
featuredImg:
toc: false
# description: string, if empty (substring main content)
description:
home: true
---
Go to [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2 "AWS EC2 Dashboard") then navigate to <code>**Intances**</code>

{{< figure
src="/uploads/2020-06-16-connect-instance-01-ec2-dashboard.webp"
alt="EC2 Dashboard"
caption="EC2 Dashboard"
class="normal" >}}

Select the instance then click <code>**Connect**</code> button

{{< figure
src="/uploads/2020-06-16-connect-instance-02-instance.webp"
alt="Instance Detail"
caption="Instance Detail"
class="normal" >}}

A window pops up will show up with a few info about how to connect to an instance 

{{< figure
src="/uploads/2020-06-16-connect-instance-03-connect-info.webp"
alt="How to Connect to Instance"
caption="How to Connect to Instance"
class="normal" >}}

*<strong>NOTE:</strong> The key-pair <code><strong>example-key.pem</strong></code> is generated when you first time launch an instance*

---
Command to apply <code>**chmod 400**</code> to key-pair

{{< highlight Terminfo >}}
chmod 400 /path/to/example-key.pem
{{< /highlight >}}

Command to connect to instance via SSH

{{< highlight Terminfo >}}
ssh -i "/path/to/example-key.pem" user@public-dns-example.com
{{< /highlight >}}

In this example, I use terminal ubuntu desktop to connect to EC2 instance

{{< figure
src="/uploads/2020-06-16-connect-instance-04-terminal-ubuntu.webp"
alt="Terminal Ubuntu"
caption="Terminal Ubuntu Desktop"
class="normal" >}}

Successfully connect to instance

{{< figure
src="/uploads/2020-06-16-connect-instance-05-success-connect.webp"
alt="Successfully Connect to Instance"
caption="Successfully Connect to Instance"
class="normal" >}}
