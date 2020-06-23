---
title: "How to Install Nginx and Setting Up Server Block to Domain on AWS EC2 Instance"
slug: "install-nginx-server-block-domain-aws-ec2-instance"
draft: false
date: 2020-06-23T14:29:57+07:00
tags: ["aws", "cloud", "nginx", "server", "domain"]
images: [
    "/uploads/2020-06-17-nginx-ec2-01-welcome-nginx.jpg",
    "/uploads/2020-06-17-nginx-ec2-01-public-ip-dns.webp",
    "/uploads/2020-06-17-nginx-ec2-02-success-server-block.webp"
]
featuredImg:
toc: true
# description: string, if empty (substring main content)
description:
home: true
---

Before begin this guide, first you must have an EC2 Instance, you can follow this post to [launch an EC2 instance](/2020/06/launch-amazon-ec2-instance-ubuntu-server-18-04/ "Launch EC2 Instance").

In this post I use EC2 Instance of Ubuntu Server 18.04, and access the instance using SSH connection in terminal of my Ubuntu Desktop, follow this post to [connect to EC2 instance](/2020/06/connect-aws-ec2-remote-ssh/ "Connect to EC2 Instance").

Configure security group of your instance to add HTTP & HTTPS connection in inbound traffic, you can follow this post to [configure security group](/2020/06/configure-security-group-aws-ec2-instance/ "Configure Security Group EC2 Instance").

Prepare a domain or subdomain, added using A Record that pointing to public IP4 address of your instance, either default IP4 address or Elastic IP4 address. 

# Install Nginx

Update Packages

{{< highlight Terminfo >}}
sudo apt update
{{< /highlight >}}

Install Nginx

{{< highlight Terminfo >}}
sudo apt install nginx
{{< /highlight >}}

Check Nginx Status

{{< highlight Terminfo >}}
sudo service nginx status
{{< /highlight >}}

Open your instance detail and copy public DNS or public IP Address

{{< figure src="/uploads/2020-06-17-nginx-ec2-01-public-ip-dns.webp" alt="EC2 Public DNS and Public IP Address" caption="EC2 Public DNS and Public IP Address" class="normal" >}}

Open a browser and paste it to check that Nginx successfully installed

{{< figure src="/uploads/2020-06-17-nginx-ec2-01-welcome-nginx.webp" alt="Nginx Welcome Page" caption="Nginx Welcome Page" class="normal" >}}

# Setting Up Nginx Server Block

When using the Nginx web server, server blocks (similar to virtual hosts in Apache) can be used to encapsulate configuration details and host more than one domain from a single server [[ref]](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04 "Install Nginx on Ubuntu 18.04"). 

In this post, I will set up my subdomain called <code>**api.budidev.com**</code>, but you should **replace this with your own domain or subdomain name**.

## Create Directory and index.html Sample File

Create directory for <code>**api.budidev.com**</code>

{{< highlight Terminfo >}}
sudo mkdir -p /var/www/api.budidev.com/html
{{< /highlight >}}

Assign ownership of the directory to current login user

{{< highlight Terminfo >}}
sudo chown -R $USER:$USER /var/www/api.budidev.com/html
{{< /highlight >}}

Create a sample <code>**index.html**</code> using nano

{{< highlight Terminfo >}}
nano /var/www/api.budidev.com/html/index.html
{{< /highlight >}}

Fill the <code>**index.html**</code> like the example below

{{< highlight html >}}
<html>
    <head>
        <title>Welcome to api.budidev.com</title>
    </head>
    <body>
        <h1>Success!  The api.budidev.com server block is working!</h1>
    </body>
</html>
{{< /highlight >}}

## Create New Nginx Server Block

Create new configuration server block file called <code>**api.budidev.com**</code>

{{< highlight Terminfo >}}
sudo nano /etc/nginx/sites-available/api.budidev.com
{{< /highlight >}}

Fill the content like the example below

{{< highlight Nginx configuration file >}}
server {
  listen 80;
  listen [::]:80;

  root /var/www/api.budidev.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name api.budidev.com;

  location / {
          try_files $uri $uri/ =404;
  }
}
{{< /highlight >}}

Enable the <code>**api.budidev.com**</code> configuration file by creating a link from it to the sites-enabled directory

{{< highlight Terminfo >}}
sudo ln -s /etc/nginx/sites-available/api.budidev.com /etc/nginx/sites-enabled/
{{< /highlight >}}

## Configure Nginx

To avoid a possible hash bucket memory problem that can arise from adding additional server names, it is necessary to adjust a single value in the <code>**/etc/nginx/nginx.conf**</code> file [[ref]](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04 "Install Nginx Ubuntu 18.04").

Open <code>**nginx.conf**</code> file

{{< highlight Terminfo >}}
sudo nano /etc/nginx/nginx.conf
{{< /highlight >}}

Find the <code>**server_names_hash_bucket_size**</code> and remove the <code>**#**</code> symbol to uncomment the line

{{< highlight Nginx configuration file >}}
http {
    server_names_hash_bucket_size 64;
}
{{< /highlight >}}

Test Nginx configuration

{{< highlight Terminfo >}}
sudo nginx -t
{{< /highlight >}}

If there aren’t any problems, restart Nginx to enable changes

{{< highlight Terminfo >}}
sudo service nginx restart
{{< /highlight >}}

Nginx should now serving your domain or subdomain. You can test this using browser by navigating to <code>**http:‎//your-domain-subdomain.com**</code>, for me is <code>**http://‎api.budidev.com**</code>

{{< figure src="/uploads/2020-06-17-nginx-ec2-02-success-server-block.webp" alt="Success Nginx Server Block" caption="Success Nginx Server Block" class="normal" >}}