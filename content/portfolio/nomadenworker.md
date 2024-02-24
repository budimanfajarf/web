---
title: 'Nomaden Worker'
slug: 'nomadenworker'
draft: true
date: 2024-02-17T20:57:13+07:00
hiddenInXml: false
isIframe: false
toc: false
---

## About The Project

Nomaden Worker is a website that helps you find your perfect workspace. It is a curated list of public spaces suitable for working, such as cafes, libraries, co-working spaces, and more. You can select your needs and preferences, such as seating type, facilities, ambience, and payment options, and the website will show you where you can find them. You can also see the latest updates, ratings, and reviews of each place. Nomaden Worker is a useful resource for remote workers, freelancers, students, and anyone who needs a change of scenery.

## The Problem

The old website was built with WordPress, the system is not flexible and it's hard to maintain. We want to upgrade the technology stacks for better performance, and want to rebuild the UI/UX as well for better user experience. As result we decide to rebuild it with Laravel as CMS & RESTful API, and Next.js as Frontend.

As we decided to rebuild the website, we still want to use the data from the old website, so we need to find some way to migrate the old data to the new one.

## My Role & Responsibility

This project was the Agency’s project where i work fulltime in Hubton Indonesia. My role here is a Backend Developer.

## The Process

1. Create Database Design

   The reason why we create a database design is to make sure the old data can be migrated to the new database, but also capable to handle new requirements. I'm responsible for the database design, I create it using [dbdiagram.io](https://dbdiagram.io/), designing all tables and columns we need, including the relationships between them.

1. Create Migrator for migrate data from WordPress to Laravel

   To migrate the data from WordPress to Laravel, the first thing we do is exposing the data from WordPress by creating a few APIs. After that we creating a few [laravel artisan commands](https://laravel.com/docs/10.x/artisan#writing-commands) to import the data from the APIs to the new database in Laravel.

1. Build the new Content Management System (CMS)

   {{< figure src="/uploads/compressed/nomadenworker-cms.png" caption="CMS of Nomaden Worker" class="normal" >}}

   For building the new CMS we decided to use [Filament Admin](https://filamentphp.com/), it contains a collection of beautiful full-stack components, it's a good choice for building a CMS. We make sure the it can be easy to use. For the content itself we can divide it into a few parts, Directory Management, Post Management, Page Management, User Management, and Settings.

1. Build the RESTful API
1. Build the Frontend web and intergrate the RESTful API
