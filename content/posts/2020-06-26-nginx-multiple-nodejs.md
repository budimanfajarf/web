---
title: "Setting Up Nginx to Run Multiple Node.js App on AWS EC2 Instance"
slug: "setting-nginx-run-multiple-nodejs-aws-ec2-instance"
draft: false
date: 2020-06-26T07:30:40+07:00
tags: ["nginx", "nodejs", "aws", "server"]
images: [
  "/uploads/2020-06-20-nginx-nodejs-00.jpg"
]
featuredImg:
toc: true
# description: string, if empty (substring main content)
description:
home: true
---
# Prerequisite

Earlier before, if you're following a post about [install nginx on AWS EC2](/2020/06/install-nginx-server-block-domain-aws-ec2-instance "Install Nginx on AWS EC2"), you'll have a server configuration file called like <code>**example.com**</code>, for me is <code>**api.budidev.com**</code>, it's configured to listen default port 80, which is default port for HTTP connection. 

And then if you're following another post about [secure HTTPS connection on nginx](/2020/06/secure-https-connection-nginx-server-block-lets-encrypt-certbot "secure HTTPS connection on nginx]"), the configuration file will be edited automatically by Certbot to configure HTTPS connection that listen on port 443, and it's configured to redirect all HTTP traffic to secure HTTPS.

The end result of configuration file <code>**api.budidev.com**</code> look like this:

{{< highlight Nginx configuration file >}}
server {
  root /var/www/api.budidev.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name api.budidev.com;

  location / {
    try_files $uri $uri/ =404;
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
{{< /highlight >}}

---

One more for prerequisite, if you're following previous post about [install node.js and make node.js app keep running](/2020/06/install-nodejs-aws-ec2-keep-running-pm2 "install node.js and make node.js app keep running"), you'll have a node.js app that running on some port, for me is port <code>**3000**</code>.

# Update api.budidev.com

Before we begin to talk about run multiple node.js app, I'll update the configuration file to route HTTP and HTTPS connection to the Node.js app that running on port <code>**3000**</code>, so I can access Node.js app by navigating to <code>**https‎://api.budidev.com**</code>, and no needed to specify the port again, like <code>**https‎://api.budidev.com:3000**</code>.

[Connect to your instance](/2020/06/connect-aws-ec2-remote-ssh/ "Connect to EC2 Instance") first, then open the configuration file:
{{< highlight TermInfo >}}
sudo nano /etc/nginx/sites-available/api.budidev.com
{{</ highlight >}}

Update the file with the content below

{{< highlight Nginx configuration file >}}
server {
  root /var/www/api.budidev.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name api.budidev.com;

  # --- UPDATE CONFIGURATION HERE ---
  location / {
    # try_files $uri $uri/ =404;
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
  # ----------------------------------  

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
{{< /highlight >}}

Notice here that my configuration file name and my server_name is <code>**api.budidev.com**</code>, you should replace with your own like <code>**example.com**</code>, and notice too that I run node.js app on port <code>**3000**</code>, replace this with your own port that run node.js app, close and save after editing.

Test nginx configuration

{{< highlight Terminfo >}}
sudo nginx -t
{{< /highlight >}}

If there aren’t any problems, restart nginx to enable changes

{{< highlight Terminfo >}}
sudo service nginx restart
{{< /highlight >}}

Now if you're going to your domain or subdomain name, for me is <code>**https://‎api.budidev.com**</code> **without** adding specific port like 3000, you should see node.js app show up:

{{< figure src="/uploads/2020-06-20-nginx-nodejs-01-api-budidev-com.webp" alt="api.budidev.com" caption="api.budidev.com" class="normal" >}}

# Run Multiple Node.js App

I found 2 approach to run multiple node.js app in one server, you can choose which one you're preferred.

## First Approuch

The first approach is, you can update and add a new <code>**location**</code> on your configuration file before, for example, I'll edit my configuration file <code>**api.budidev.com**</code> 

1. Create and run a new node.js app on some port, for example port <code>**3001**</code>, *look at a post about [install node.js and make node.js app keep running](/2020/06/install-nodejs-aws-ec2-keep-running-pm2/ "install node.js and make node.js app keep running") for detail*

2. Update <code>**api.budidev.com**</code>

{{< highlight Nginx configuration file >}}
server {
  root /var/www/api.budidev.com/html;
  index index.html index.htm index.nginx-debian.html;

  server_name api.budidev.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # --- ANOTHER NODE.JS APP HERE ---
  location /app2/ {
    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }  
  # ---------------------------------

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
{{< /highlight >}}

In this approuch, the second node.js app will run on route <code>**/app2**</code>, for me is <code>**https://‎api.budidev.com/app2**</code>

## Second Approuch

The second approach is, you can run another your node.js app on new domain or subdomain, for example: 

1. Create domain or subdomain called <code>**sub.example.com**</code> using A Record and pointing this to IP Address of your AWS EC2 instance
2. Create and run a new node.js app on some port, for example port <code>**3001**</code>, *look at a post about [install node.js and make node.js app keep running](/2020/06/install-nodejs-aws-ec2-keep-running-pm2/ "install node.js and make node.js app keep running") for detail*
3. Create new nginx server block configuration file called <code>**sub.example.com**</code>, and use <code>**proxy_pass**</code> to route to your node.js app on port <code>**3001**</code>, [like the example above](#update-api-budidev-com "example above")
4. Secure your domain or subdomain using Let's Encrypt, *look at a post about [secure https connection in nginx](/2020/06/secure-https-connection-nginx-server-block-lets-encrypt-certbot/ "secure https connection in nginx") for detail*