---
title: "Configure Security Group in AWS EC2 Instance"
slug: "configure-security-group-aws-ec2-instance"
draft: false
date: 2020-06-23T08:35:22+07:00
tags: ["aws", "network", "server"]
images: [
  "/uploads/2020-06-16-security-group-02-security-group-id.jpg"
]
featuredImg:
toc: false
# description: string, if empty (substring main content)
description:
home: true
---
A security group acts as a virtual firewall for your instance to control incoming and outgoing traffic. Inbound rules control the incoming traffic to your instance, and outbound rules control the outgoing traffic from your instance [[ref]](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html "EC2 Security Group").

You can easily configure security group of your instance via [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2 "AWS EC2 Dashboard").

Select an instance, then look at <code>**Description**</code> tab, click the link like example below to navigate to security group

{{< figure
src="/uploads/2020-06-16-security-group-01-instance-detail.webp"
alt="Security Group in Instance Detail"
caption="Security Group in Instance Detail"
class="normal" >}}

Click the Security group ID link like example below to see detail inbound and outbond traffic of your instance

{{< figure
src="/uploads/2020-06-16-security-group-02-security-group-id.webp"
alt="Security Group in Instance Detail"
caption="Security Group in Instance Detail"
class="normal" >}}

When you launch an instance and don't configure the security group, the default rules will look like this

{{< figure
src="/uploads/2020-06-16-security-group-03-default-inbound.webp"
alt="Default Inbound Traffic"
caption="Default Inbound Traffic"
class="normal" >}}

{{< figure
src="/uploads/2020-06-16-security-group-03-default-outbound.webp"
alt="Default Outbound Traffic"
caption="Default Outbound Traffic"
class="normal" >}}

To edit rules of inbound or outbound traffic, click <code>**Edit**</code> button like example below

{{< figure
src="/uploads/2020-06-16-security-group-03-button-edit.webp"
alt="Security Group in Instance Detail"
caption="Security Group in Instance Detail"
class="normal" >}}

{{< figure
src="/uploads/2020-06-16-security-group-04-edit-inbound-rules.webp"
alt="Security Group in Instance Detail"
caption="Example Inbound Rules"
class="normal" >}}

In the example above, I added new rules HTTP (port 80), HTTPS (port 443) and Custom TCP (port 3000) to inbound rules.

The following inbound rules allow HTTP and HTTPS access from any IP address. This is for setup my instance to be a [web server](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#sg-rules-web-server, "AWS Web Server Rules"), so I can access like this:

* http://aws-public-dns-or-example-domain.com
* https://aws-public-dns-or-example-domain.com

Then I added custom TCP (port 3000), so I can access web server like this:

* http://aws-public-dns-or-example-domain.com:3000
* https://aws-public-dns-or-example-domain.com:3000

The custom TCP above is not for production, I use this to test Node.js application running on Port 3000.

Save new added rules by click orange button <code>**Save rules**</code>
