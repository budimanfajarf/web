---
title: "How to Install LEMP Stack (Linux, Nginx, MySQL, PHP) on Ubuntu 18.04 AWS EC2"
slug: "install-lemp-stack-linux-nginx-mysql-php-ubuntu-18-04-aws-ec2"
draft: false
date: 2020-06-09T06:30:16+07:00
tags: ["lemp", "linux", "nginx", "mysql", "php", "ubuntu", "aws", "server"]
images: [
  "/uploads/compressed/aws-lemp-stack.jpg",
  "/uploads/compressed/nginx-welcome-page.png",
  "/uploads/compressed/php-info-page.png"
]
toc: true
# description: string, if empty (substring main content)
description:
home: true
---
{{< figure src="/uploads/compressed/aws-lemp-stack.jpg" alt="AWS LEMP Stack" caption="AWS LEMP Stack" class="normal" >}}

In this post I will show you how to install LEMP Stack on AWS EC2 Instance

* L = Linux (Ubuntu 18.04)

* E = Engine X / Nginx (1.14)

* M = MySQL (5.7)

* P = PHP (7.2)

# Creating AWS EC2 Instance

First of all, you must have an AWS account, you can register [here](https://portal.aws.amazon.com/billing/signup "AWS SignUp") and get 12 months of Free Tier access from Amazon Web Service (AWS).

After registering an AWS account, sign in to [AWS Console](https://aws.amazon.com/console/ "AWS Console") then choose EC2 Service, Launch new Instance then follow the steps with this options: 

* **Amazon Machine Image (AMI):** Ubuntu Server 18.04 LTS

* **Instance Type:** General purpose | t2.micro

* **Instance Details:** Leave to default settings

* **Storage:** Leave to default settings or you can adjust the size (Max of Free Tier is 30GB)

* **Tags:** Add your tags or you can skip this step

* **Security Group:** Create a new security group with the rules below

| Type | Protocol | Port Range | Source |
| :-- | :-- | :-- | :-- |
| SSH | TCP | 22 | Custom - 0.0.0.0/0 |
| HTTP | TCP | 80 | Anywhere - 0.0.0.0/0, ::/0 |

* **Review Instance Launch:** Verify the settings then click Launch

* * A window pops up will asking you to select an existing key-pair or create a new key-pair. If you haven't created a key pair before then create a new one, then <code>**download**</code> it to your local computer. The <code>**key-pair**</code> is using to [connect the Instance via SSH Client](/2020/06/remote-ssh-cheat-sheet "Connecting to Remote SSH").

# Connecting to AWS EC2 Instance

To see how to connect to your Instance, go to [AWS EC2 Dashboard](https://console.aws.amazon.com/ec2/v2 "AWS EC2 Dashboard"), navigate to <code>**Running Instances**</code>, select the Instance of Ubuntu 18.04 that launched before, then click <code>**Connect**</code> button. You will see a few info about how to connect to AWS EC2 Instance.

In this example, I use terminal on Ubuntu desktop as SSH Client to connect to AWS EC2 Instance.

* Move the <code>**key-pair**</code> file you download before to <code>**~/.ssh**</code> directory

* Open a terminal then apply <code>**chmod 400**</code> to the file

{{< highlight Terminfo >}}
chmod 400 ~/.ssh/your-key.pem
{{< /highlight >}} 

* In a terminal, connect to your instance using Public DNS with the key-pair as identify file, Example:

{{< highlight Terminfo >}}
ssh -i "~/.ssh/your-key.pem" ubuntu@ec2-13-229-132-71.ap-southeast-1.compute.amazonaws.com
{{< /highlight >}} 

To see your <code>**Public DNS**</code>  or <code>**Public IP Address**</code>, go to [AWS EC2 Dashboard](https://console.aws.amazon.com/ec2/v2 "AWS EC2 Dashboard"), select your instance then see in <code>**Description Section**</code>.

# Installing Nginx Server

After you successfully connect to your instance, now you can managing the instance as you want. To Setup the LEMP Stack, first update your instance packages

{{< highlight Terminfo >}}
sudo apt update
{{< /highlight >}}

Then install the Nginx Server

{{< highlight Terminfo >}}
sudo apt install nginx
{{< /highlight >}}

Open a browser then go to your Public DNS or Public IP Address of your instance to check that Nginx successfully installed.

<code>**htpps://your-public-DNS-or-IP-address**</code>

{{< figure src="/uploads/compressed/nginx-welcome-page.png" alt="Nginx Welcome Page" caption="Nginx Welcome Page" class="normal" >}}

# Installing MySQL

The next thing to do is installing MySQL, use this command to install it

{{< highlight Terminfo >}}
sudo apt install mysql-server
{{< /highlight >}}

Configure MySQL with this command

{{< highlight Terminfo >}}
sudo mysql_secure_installation
{{< /highlight >}}

# Installing PHP

Install <code>**php-fpm**</code>, a stands for “fastCGI process manager” to tell Nginx to pass PHP requests to this software for processing

{{< highlight Terminfo >}}
sudo apt install php-fpm
{{< /highlight >}}

Install <code>**php-mysql**</code> to allow PHP communicate with database backend

{{< highlight Terminfo >}}
sudo apt install php-mysql
{{< /highlight >}}

# Configuring Nginx to Use PHP

Now the LEMP Stack are installed, but we have to configure Nginx to use PHP processor for dynamic content.

In this example, I will edit the <code>**default**</code> configuration server block of Nginx

First, backup the default configuration file

{{< highlight Terminfo >}}
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
{{< /highlight >}}

Open default configuration file using nano

{{< highlight Terminfo >}}
sudo nano /etc/nginx/sites-available/default
{{< /highlight >}}

Fill with the content bellow

{{< highlight Nginx configuration file >}}
server {
        listen 80;
        root /var/www/html;
        index index.php index.html index.nginx-debian.html;
        server_name _;

        location / {
                try_files $uri $uri/ =404;
        }

        location ~ \.php{
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}
{{< /highlight >}}

Create <code>**info.php**</code> file to test PHP

{{< highlight Terminfo >}}
sudo nano /var/www/html/info.php
{{< /highlight >}}

Fill with the content bellow

{{< highlight php >}}
<?php
phpinfo();
{{< /highlight >}}

Restart Nginx

{{< highlight Terminfo >}}
sudo service nginx restart
{{< /highlight >}}

Open a browser then go to <code>**htpps://your-public-DNS-or-IP-address/info.php**</code>

If everything works fine you should see PHP info page like this

{{< figure src="/uploads/compressed/php-info-page.png" alt="PHP Info Page" caption="PHP Info Page" class="normal" >}}







