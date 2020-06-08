---
title: "Install Linux, Nginx, MySQL, PHP (LEMP Stack) on Ubuntu 18.04 AWS EC2"
slug: "install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04-aws-ec2"
draft: true
date: 2020-06-08T15:47:16+07:00
tags: ["linux", "ubuntu", "nginx", "mysql", "php", "lemp", "aws", "server"]
images: ["/uploads/aws-lemp-stack.png"]
toc: true
# description: string, if empty (substring main content)
description:
---
![AWS LEMP Stack](/uploads/aws-lemp-stack.png)
# Creating AWS EC2 Instance

First of all you must have an AWS account, you can register [here](https://portal.aws.amazon.com/billing/signup "AWS SignUp") and get 12 months of Free Tier access from Amazon Web Service (AWS).

After registered an AWS account, sign in to [AWS Console](https://aws.amazon.com/console/ "AWS Console") then choose EC2 Service, Launch Instance then follow the steps with this options: 

* **Amazon Machine Image (AMI):** Ubuntu Server 18.04 LTS

* **Instance Type:** General purpose | t2.micro

* **Instance Details:** Leave to default settings

* **Storage:** Leave to default settings or you can adjust the size (Max of Free Tier is 30GB)

* **Tags:** Add your tags or you can skip this

* **Security Group:** Create a new security group with the rules below

| Type | Protocol | Port Range | Source |
| :-- | :-- | :-- | :-- |
| SSH | TCP | 22 | Custom - 0.0.0.0/0 |
| HTTP | TCP | 80 | Anywhere - 0.0.0.0/0, ::/0 |

* **Review Instance Launch:** Verify the settings then click Launch

* * A window pops up will asking you to select an existing key pair or create a new key pair. If you haven't create a key pair before then create a new one, save it to your computer. The key pair is using to connect the Instance via SSH Client.

# Connecting to AWS EC2 Instance

To see how to connect your Instance, go to EC2 Dashboard, click Running Instances, select the Instance of Ubuntu 18.04 that launched before, then click Connect.

In this example I use terminal on Ubuntu desktop to connect AWS EC2 Instance 

* Move the key you download before to ~/.ssh

* Open a terminal then apply chmod 400 to the key

```
$ cd ~/.ssh
$ chmod 400 your-key.pem
```
* In a terminal, connect to your instance using Public DNS, Example:
```
$ ssh -i "~/.ssh/your-key.pem" ubuntu@ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com
```

# Installing Nginx Server

After you successfully connecting to your instance, now you can managing the instance as you want. To Setup the LEMP Stack, first update your instance packages:

```
$ sudo apt update
```
Then install the Nginx Server:
```
$ sudo apt install nginx
```

Open a browser then go to your Public IP Address or Public DNS of your instance to check that Nginx successfully installed.

# Installing MySQL

After succesfully installed Nginx Server the next thing to do is installing MySQL

```
$ sudo apt install mysql-server
```

Configure MySQL with this command

```
$ sudo mysql_secure_installation
```

# Installing PHP
Install php-fpm, a stands for “fastCGI process manager” to tell Nginx to pass PHP requests to this software for processing

```
$ sudo apt install php-fpm
```

Install php-mysql to allow PHP communicate with database backend

```
$ sudo apt install php-mysql
```

# Configuring Nginx to Use PHP
Now the LEMP Stack are installed, but we have to configuring Nginx to use PHP processor for dynamic content.

In this example I will editing the default configuration server block of Nginx

Backup default configuration
```
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
```

Open default configuration using nano
```
sudo nano /etc/nginx/sites-available/default
```

Edit the configuration file with the content bellow
```
server {
        listen 80;
        root /var/www/html;
        index index.php index.html index.nginx-debian.html;
        server_name _;

        location / {
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}
```

Create file to test PHP
```
sudo nano /var/www/html/info.php
```

Fill with the content bellow
```
<?php
phpinfo();
```

Restart Nginx
```
$ sudo service nginx restart
```

Open a browser then go to <code>http://‎your-ip-or-domain/info.php</code>

If everything works fine you should see info PHP page like this







