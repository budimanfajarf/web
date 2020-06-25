---
title: "How to Secure HTTPS Connection in Nginx Server with Let's Encrypt"
slug: "secure-https-connection-nginx-server-block-lets-encrypt-certbot"
draft: false
date: 2020-06-24T00:01:44+07:00
tags: ["nginx", "server", "network"]
images: [
  "/uploads/2020-06-18-https-nginx-01-certbot.jpg",
  "/uploads/2020-06-18-https-nginx-02-certbot.webp",
  "/uploads/2020-06-18-https-nginx-03-certbot.webp",
  "/uploads/2020-06-18-https-nginx-04-certbot.webp",
  "/uploads/2020-06-18-https-nginx-05-success-https.webp",
  "/uploads/2020-06-18-https-nginx-06-certbot-renew.webp"
]
featuredImg:
toc: false
# description: string, if empty (substring main content)
description:
home: false
---

<code>**Let’s Encrypt**</code> is a Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, <code>**Certbot**</code>, that attempts to automate most (if not all) of the required steps [[ref]](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04).

If you following preview post about [How to Install Nginx and Setting Up Server Block](/2020/06/install-nginx-server-block-domain-aws-ec2-instance/ "How to Install Nginx and Setting Up Server Block"), you'll have an nginx configuration file called like <code>**example.com**</code>, for me is <code>**api.budidev.com**</code>. The file should be saved in directory <code>**/etc/nginx/sites-available**</code> and linking to <code>**/etc/nginx/sites-enabled**</code>.

In this post, I'll show you how to enable HTTPS (SSL/TLS) connection for domain or subdomain in nginx server block configuration file. The configuration will automatically generated using Certbot by Let's Encrypt.

You can see the official instruction by Let's Encrypt to [using Certbot here](https://certbot.eff.org/ "Certbot").

First of all, you have to connect to the server, if you use AWS EC2 instance as a web server, you can follow this post to [connect to EC2 instance](/2020/06/connect-aws-ec2-remote-ssh/ "Connect to EC2 Instance")

## Add Certbot PPA and Install Certbot

Add the Certbot PPA to list of repositories with the commands below

{{< highlight Terminfo >}}
sudo apt-get install software-properties-common
{{< /highlight >}}

{{< highlight Terminfo >}}
sudo add-apt-repository universe
{{< /highlight >}}

{{< highlight Terminfo >}}
sudo add-apt-repository ppa:certbot/certbot
{{< /highlight >}}

{{< highlight Terminfo >}}
sudo apt-get update
{{< /highlight >}}

Install Certbot with the command below

{{< highlight Terminfo >}}
sudo apt-get install certbot python3-certbot-nginx
{{< /highlight >}}

## Get an SSL Certificate and Automatically Configure

Run the command below to get a certificate and let Certbot edit Nginx configuration automatically

{{< highlight Terminfo >}}
sudo certbot --nginx
{{< /highlight >}}

If this is the first time running certbot, you'll be prompted to enter an email address and agree to the terms of service

{{< figure src="/uploads/2020-06-18-https-nginx-01-certbot.webp" alt="Certbot Email and Agreements" caption="Certbot Email and Agreements" class="normal" >}}

Choose the domain or subdomain you want to activate HTTPS

{{< figure src="/uploads/2020-06-18-https-nginx-02-certbot.webp" alt="Certbot Choose Nginx Configuration File" caption="Certbot Choose Nginx Configuration File" class="normal" >}}

Choose the options you preffer, choose option 1 so you can access web server via HTTP and HTTPS, choose option 2 to redirecting HTTP to HTTPS

{{< figure src="/uploads/2020-06-18-https-nginx-03-certbot.webp" alt="Certbot Choose Redirect or No" caption="Certbot Choose Redirect or No" class="normal" >}}

If everything works fine, certbot will print a success message with the important notes like the example below

{{< figure src="/uploads/2020-06-18-https-nginx-04-certbot.webp" alt="Certbot Success Install Certificates" caption="Certbot Success Install Certificates" class="normal" >}}

Now the certificates are installed, try to access web server in a browser using <code>**https**</code> connection, for me is <code>**https://‎api.budidev.com**</code>

{{< figure src="/uploads/2020-06-18-https-nginx-05-success-https.webp" alt="Success Secure HTTPS Connection" caption="Success Secure HTTPS Connection" class="normal" >}}

## Test automatic renewal

The Certbot packages on your system come with a cron job or systemd timer that will renew your certificates automatically before they expire. You will not need to run Certbot again unless you change your configuration [[ref](https://certbot.eff.org/ "Certbot")].

You can test automatic renewal for your certificates by running this command:

{{< highlight Terminfo >}}
sudo certbot renew --dry-run
{{< /highlight >}}

{{< figure src="/uploads/2020-06-18-https-nginx-06-certbot-renew.webp" alt="Certbot Success Test Renew Certificate" caption="Certbot Success Test Renew Certificate" class="normal" >}}