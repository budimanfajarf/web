---
title: "Let's Try to Launch Amazon EC2 Instance (Ubuntu Server 18.04)"
slug: "launch-amazon-ec2-instance-ubuntu-server-18-04"
draft: false
date: 2020-06-22T11:59:20+07:00
tags: ["aws", "cloud", "ubuntu", "server"]
images: [
  "/uploads/2020-06-15-amazon-ec2-07-instance.webp",
  "/uploads/2020-06-15-amazon-ec2-04-step1-ami.webp",
  "/uploads/2020-06-15-amazon-ec2-03-ec2-dashboard.webp",    
]
featuredImg:
toc: true
# description: string, if empty (substring main content)
description:
home: true
---
# About Amazon EC2

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers. Amazon EC2’s simple web service interface allows you to obtain and configure capacity with minimal friction. It provides you with complete control of your computing resources and lets you run on Amazon’s proven computing environment [[ref]](https://aws.amazon.com/ec2/ "Amazon EC2").

  > In short, Amazon EC2 is a Virtual Server in the Cloud.

# Launch Amazon EC2 Instance

First of all, you must have an AWS account, you can follow this post to [create an AWS account](/2020/06/how-create-aws-account-free-tier-offers/ "Create an AWS account"). 

Go and Sign In to [AWS Management Console](https://console.aws.amazon.com/ "AWS Management Console")

{{< figure
src="/uploads/2020-06-15-amazon-ec2-01-sign-in.webp"
alt="AWS Console Sign In"
caption="AWS Console Sign In"
class="normal" >}}

Find services then choose EC2

{{< figure
src="/uploads/2020-06-15-amazon-ec2-02-console.webp"
alt="AWS Console EC2"
caption="AWS Console EC2"
class="normal" >}}

Now you should be redirected to [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2 "AWS EC2 Dashboard").

{{< figure
src="/uploads/2020-06-15-amazon-ec2-03-ec2-dashboard.webp"
alt="AWS EC2 Dashboard"
caption="EC2 Dashboard"
class="normal" >}}

To launch a new EC2 Instance, Click orange button <code>**Launch Instance**</code>

{{< figure
src="/uploads/2020-06-15-amazon-ec2-03-launch-instance.webp"
alt="Launch Instance Button"
caption="Launch Instance"
class="normal" >}}

## Step 1: Choose an Amazon Machine Image (AMI)

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step1-ami.webp"
alt="Step 1: AMI"
caption="Step 1: AMI"
class="normal" >}}

Choose [AMI](https://en.wikipedia.org/wiki/Amazon_Machine_Image "Amazon Machine Image") you preferred, check <code>**Free tier only**</code> to show only AMI that covered around [Free Tier Offers by AWS](https://aws.amazon.com/free/ "Free Tier Offers by AWS"). I'll select Ubuntu Server 18.04 that I preferred. 

Click <code>**Select**</code> button to continue

## Step 2: Choose an Instance Type

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step2-instance-type.webp"
alt="Step 2: Instance Type"
caption="Step 2: Instance Type"
class="normal" >}}

Leave to default settings then click <code>**Next: Configure Instance Detail**</code>

## Step 3: Configure Instance Detail

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step3-instance-detail.webp"
alt="Step 3: Instance Detail"
caption="Step 3: Instance Detail"
class="normal" >}}

Leave to default settings then click <code>**Next: Add Storage**</code>

## Step 4: Add Storage

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step4-storage.webp"
alt="Step 4: Storage"
caption="Step 4: Storage"
class="normal" >}}

Leave to default settings or you can adjust the size (Max of Free Tier is 30GB), then click <code>**Next: Add Tags**</code>

## Step 5: Add Tags

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step5-tags.webp"
alt="Step 5: Tags"
caption="Step 5: Tags"
class="normal" >}}

Leave to default settings then click <code>**Next: Configure Security Group**</code>

## Step 6: Configure Security Group

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step6-security-group.webp"
alt="Step 6: Security Group"
caption="Step 6: Security Group"
class="normal" >}}

Leave to default settings then click <code>**Review and Launch**</code>. *I'll tell about security group in another post*.

## Step 7: Review Instance Launch

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-04-step7-review-instance.webp"
alt="Step 7: Review Instance"
caption="Step 7: Review Instance"
class="normal" >}}

Verify the whole settings you set up before then click <code>**Launch**</code>

A window pops up will asking you to select an existing key-pair or create a new key-pair. If you haven’t created a key pair before then create a new one, then download it to your local computer. The key-pair is using to connect the Instance via SSH Client.

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-05-key-pair.webp"
alt="Key Pair"
caption="Key Pair"
class="normal" >}}

After you download the key-pair, then click <code>**Launch Instances**</code>

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-06-launch-status.webp"
alt="Success Launch Instance"
caption="Success Launch Instance"
class="normal" >}}

Congrats! You are successfully launching an EC2 Instance :)

Click <code>**View Instances**</code> to see detail instance you launched

{{< figure 
src="/uploads/2020-06-15-amazon-ec2-07-instance.webp"
alt="Instance Detail"
caption="Instance Detail"
class="normal" >}}

You may have to wait a few minutes until the status of the instance change from <code>**pending**</code> to <code>**running**</code>, just wait :)

