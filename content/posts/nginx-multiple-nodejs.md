---
title: "Setting Up Nginx to Run Multiple Node.js App on AWS EC2 Instance"
slug: "setting-nginx-run-multiple-nodejs-aws-ec2-instance"
draft: false
date: 2020-06-26T07:30:40+07:00
tags: ["nginx", "nodejs", "aws", "server"]
images: []
featuredImg:
toc: false
# description: string, if empty (substring main content)
description:
home: true
---
Earlier before, if you're following a post about [install nginx on AWS EC2](/2020/06/install-nginx-server-block-domain-aws-ec2-instance "Install Nginx on AWS EC2") and following another post about [secure HTTPS connection on nginx](/2020/06/secure-https-connection-nginx-server-block-lets-encrypt-certbot "secure HTTPS connection on nginx]"), you'll have a server block nginx configuration file called like <code>**example.com**</code>, for me is <code>**api.budidev.com**</code>, the configuration file will look like this:

server {
  root /var/www/api.budidev.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name api.budidev.com;

  location / {
    # try_files $uri $uri/ =404;
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/api.budidev.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/api.budidev.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {

  if ($host = api.budidev.com) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  listen 80;
  listen [::]:80;

  server_name api.budidev.com;
  return 404; # managed by Certbot

}

And if you're following previous post about [install node.js and make node.js app keep running](/2020/06/install-nodejs-aws-ec2-keep-running-pm2 "install node.js and make node.js app keep running"), you'll have a node.js app that running on some port, for me is port <code>**3000**</code>.

In the <code>**api.budidev.com**</code> configuration file, the nginx server is listening on port 80 and 443, which is default port for HTTP and HTTPS connection. 

In this post I'll update the <code>**api.budidev.com**</code> configuration file to route HTTP and HTTPS connection to the Node.js app that running on port <code>**3000**</code>, so I can access Node.js app by navigate to <code>**https‎://api.budidev.com**</code>, and no needed to spesicific the port again, like <code>**https‎://api.budidev.com:3000**</code>.
