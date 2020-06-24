---
title: "How to Install Node.js on AWS EC2 and Make Node.js App Keep Running"
slug: "install-nodejs-aws-ec2-keep-running-pm2"
draft: false
date: 2020-06-25T00:22:57+07:00
tags: ["nodejs", "aws"]
images: [
  "/uploads/2020-06-19-nodejs-aws-07-pm2-start.jpg",
  "/uploads/2020-06-19-nodejs-aws-06-hello-world.webp"
]
featuredImg:
toc: true
# description: string, if empty (substring main content)
description:
home: true
---
In this post, I will show you how to install Node.js and use PM2 as proccess manager to make node.js app keep running, I use my AWS EC2 instance of Ubuntu 18.04 for the installation, you can follow this post to [launch an EC2 instance](/2020/06/launch-amazon-ec2-instance-ubuntu-server-18-04/ "Launch EC2 Instance") or you can use your local computer for the installation.

If you use an AWS EC2 instance to follow this post, you have to [connect to instance](/2020/06/connect-aws-ec2-remote-ssh/ "Connect to EC2 Instance") first, and add Custom TCP at port 3000 in inbound rules, this port is use for test to run node.js app.

# Install Node.js using NVM

## Install NVM

If you've connected to your instance or use your local computer, now time to install node.js. In this post I'll install node.js using nvm, nvm is a version manager for node.js.

The reasons I install node.js using nvm are that I can easilly switch node.js version that currently running to another version, and I can install global packages <code>**npm i -g**</code> without doing sudo.

Run the following commands in a terminal to **install** or **update** nvm

{{< highlight Terminfo >}}
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
{{< /highlight >}}

The command above will downloads a script and runs it. The script clones the nvm repository to <code>~/.nvm</code>, and attempts to add the source lines to the correct profile file (<code>~/.bash_profile</code>, <code>~/.zshrc</code>, <code>~/.profile</code>, or <code>~/.bashrc</code>).

{{< figure src="/uploads/2020-06-19-nodejs-aws-01-install-nvm.webp" alt="Install nvm" caption="Install nvm" class="normal" >}}

You can find the [updated version of nvm here](https://github.com/nvm-sh/nvm#install--update-script "github nvm")

Run the command below to check that nvm was successfully installed

{{< highlight Terminfo >}}
nvm --version
{{< /highlight >}}

The terminal will show <code>Command 'nvm' not found</code> as the code has been added to your profile but hasn’t run yet

{{< figure src="/uploads/2020-06-19-nodejs-aws-02-nvm-not-found.webp" alt="nvm not found" caption="nvm not found" class="normal" >}}

Just close the currently opened terminal and launch a new terminal and run <code>**nvm --version**</code> again

{{< figure src="/uploads/2020-06-19-nodejs-aws-02-nvm-version.webp" alt="nvm --version" caption="nvm --version" class="normal" >}}

## Install Node.js

To install node.js using nvm, you can use <code>**nvm install**</code> node to install the latest version of node, or use <code>**nvm install 6.14.4**</code> to install a specific version of node, or use <code>**nvm install --lts**</code> to install the latest LTS version of node. 

NVM will install Node.js include with NPM (Node Package Manager), see the [complete guide to use nvm here](https://github.com/nvm-sh/nvm "github nvm").

Install the latest LTS version of Node.js

{{< highlight Terminfo >}}
nvm install --lts
{{< /highlight >}}

{{< figure src="/uploads/2020-06-19-nodejs-aws-03-nvm-install-lts.webp" alt="nvminstall --ltsn" caption="nvm install --lts" class="normal" >}}

Check the installed version of Node.js

{{< highlight Terminfo >}}
node --version
{{< /highlight >}}

Check the installed version of NPM

{{< highlight Terminfo >}}
npm --version
{{< /highlight >}}


{{< figure src="/uploads/2020-06-19-nodejs-aws-04-node-npm-version.webp" alt="node npm --version" caption="node npm --version" class="normal" >}}


# Run Example Node.js App

Node.js has successfully installed in your system, now time to run some node.js application. I'll run an application that cloning from [my github repository](https://github.com/budimanfajarf/node-hello-world "budimanfajarf hello-world"), the app is quite simple, it just a 'Hello World' app, it use just for test that node.js running correctly.

The main code <code>**app.js**</code> of this repository is look like this:

{{< highlight javascript >}}
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
{{< /highlight >}}

Clone the repository

{{< highlight Terminfo >}}
git clone https://github.com/budimanfajarf/node-hello-world.git
{{< /highlight >}}

Change directory to <code>**node-hello-world**</code>

{{< highlight Terminfo >}}
cd node-hello-world
{{< /highlight >}}

Install packages using npm

{{< highlight Terminfo >}}
npm install
{{< /highlight >}}

Run Node.js app

{{< highlight Terminfo >}}
node app.js
{{< /highlight >}}

{{< figure src="/uploads/2020-06-19-nodejs-aws-05-nodejs-app.webp" alt="node npm --version" caption="node npm --version" class="normal" >}}

Open a browser and navigate to <code>**localhost:3000**</code> if you're using a local computer, or navigate to <code>**public-dns-or-ip-address:3000**</code> if you're using an AWS EC2 Instance.

{{< figure src="/uploads/2020-06-19-nodejs-aws-06-hello-world.webp" alt="node npm --version" caption="node npm --version" class="normal" >}}

# Make Node.js App Keep Running

## Install PM2

The app will run as long as you open the terminal, but when you close the terminal or press <code>**Ctrl-C**</code>, the app will stop running. To make node.js app keep running, we can use a process manager called PM2, find for more information [about PM2 here](https://www.npmjs.com/package/pm2 "NPM PM2").

First, stop the <code>**app.js**</code> running before by press <code>**Ctrl-C**</code>

Install PM2 globally using npm

{{< highlight Terminfo >}}
npm install pm2 -g
{{< /highlight >}}

Start Node.js app using PM2

{{< highlight Terminfo >}}
pm2 start ~/node-hello-world/app.js
{{< /highlight >}}

{{< figure src="/uploads/2020-06-19-nodejs-aws-07-pm2-start.webp" alt="pm2 start app.js" caption="pm2 start app.js" class="normal" >}}

Now even if you close the terminal, the app will keep running and can access using a browser on a url like <code>**localhost:3000**</code> if you use local computer, or <code>**public-dns-or-ip-address:3000**</code> if you you use an AWS EC2 instance.

## Configure Startup 

When you reboot your server, the app won't automatically running, we can setting up startup configuration by generate startup script using pm2.

To generate the startup script, use the following command:

{{< highlight Terminfo >}}
pm2 startup
{{< /highlight >}}

Copy the generated script and hit enter to run it

{{< figure src="/uploads/2020-06-19-nodejs-aws-08-pm2-startup-script.webp" alt="pm2 startup script" caption="pm2 startup script" class="normal" >}}

Save the configuration

{{< highlight Terminfo >}}
pm2 save
{{< /highlight >}}

{{< figure src="/uploads/2020-06-19-nodejs-aws-09-pm2-save.webp" alt="pm2 save" caption="pm2 save" class="normal" >}}

Now when you reboot your server, the pm2 will automatically running and start node.js app! :)

If you want to remove the startup configuration, the steps are similar, generate unstartup script with the command below

{{< highlight Terminfo >}}
pm2 unstartup
{{< /highlight >}}

**Copy** and **run** the generated script, then save the configuration with <code>**pm2 save**</code>.

## Usefull PM2 Commands

List all running apps:

{{< highlight Terminfo >}}
pm2 list
{{< /highlight >}}

Managing apps:

{{< highlight Terminfo >}}
pm2 stop <app_name|namespace|id|'all'|json_conf>
{{< /highlight >}}

{{< highlight Terminfo >}}
pm2 restart <app_name|namespace|id|'all'|json_conf>
{{< /highlight >}}

{{< highlight Terminfo >}}
pm2 delete <app_name|namespace|id|'all'|json_conf>
{{< /highlight >}}

Details on a specific app:

{{< highlight Terminfo >}}
pm2 describe <id|app_name>
{{< /highlight >}}

Monitor logs, custom metrics, apps information:

{{< highlight Terminfo >}}
pm2 monit
{{< /highlight >}}

Find more info about PM2 on [npmjs](https://www.npmjs.com/package/pm2 "NPM PM2") or [keymetrics](https://pm2.keymetrics.io/ "Keymetrics PM2")