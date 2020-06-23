---
title: "How to Secure HTTPS Connection in Nginx Server Block with Let's Encrypt"
slug: "secure-https-nginx-lets-encrypt"
draft: true
date: 2020-06-23T16:46:44+07:00
tags: ["nginx", "server", "network"]
images: []
featuredImg:
toc: false
# description: string, if empty (substring main content)
description:
home: true
---

Let’s Encrypt is a Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, Certbot, that attempts to automate most (if not all) of the required steps [[ref]](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04).

If you following preview post about [How to Install Nginx and Setting Up Server Block](/2020/06/install-nginx-server-block-domain-ec2-instance/ "How to Install Nginx and Setting Up Server Block"), you'll have a nginx configuration file called like <code>**example.com**</code>, for me is <code>**api.budidev.com**</code>. The file should be saved in directory <code>**/etc/nginx/sites-available**</code> and linking to <code>**/etc/nginx/sites-enabled**</code>.

In this post, I'll show you how to enable HTTPS (SSL/TLS) connection for domain or subdomain in nginx server block configuration file. The configuration will automatically generated using Certbot by Let's Encrypt.

You can see the official instruction by Let's Encrypt to [using Certbot here](https://certbot.eff.org/ "Certbot").

# Installing Certbot