---
title: 'PrimaKu Microservices'
slug: 'primaku-microservices'
draft: true
date: 2024-02-13T08:47:49+07:00
hiddenInXml: false
isIframe: false
toc: true
---

## About The Company

PT Cipta Medika Informasi (PrimaKu), an application that monitors children's health, exclusively collaborates with the Indonesian Pediatric Society (IDAI). Through this application, parents can easily and quickly access information about child development and health. PrimaKu also assists pediatricians in providing the best service by involving them in monitoring child development and health through separate application called PrimaPro.

## My Role & Responsibility

I work as a full-time Software Engineer (Backend) at PrimaKu. I have built some backend services from scratch and also contributed to existing backend services.

Below are some backend services I have contributed to while I’m working at PrimaKu:

### Core Service

Primary backend service for PrimaKu's application. There are various features I have work on in this service, the interesting one is for authentication. One day we decide to change 3rd party service for handle WhatsApp OTP to reduce our monthly costs, I entrusted to working on it.

The first thing I do is research and testing the 3rd party service APIs, to make sure this service is capable for our needs. In the development & integration process, I intensively communicate with the Customer Support (CS) when facing an issue. After completed the development & integration process, and then tested by our Quality Assurance (QA) team, we successfully migrate the WhatsApp OTP to the new 3rd party service and reduce our monthly costs.

### Payment Service

There are a lot of payment methods we used in our application, such as Bank Transfer, Credit Card, E-Wallet, and BNPL (Buy Now, Pay Later). In the Payment Gateway itself we use two different payment gateways to accomodate our needs. One of payment method I have work on is BNPL.

The chalenges part when integrate BNPL payment method is it has complex step rather than the other payment methods. Payment method normally just have 2 step, create the payment and then waiting the callback, that's it.

BNPL in other hand have at least 4 step, create customer account, create paylater plans, create the payment, and then waiting the callback. To improving the user experience and simplify the process, we reduce it into 2 or 3 step.

The first step is checking if our user has completed their profile to fullfill required data for creating customer account, if it's completed the user continue to the next step, otherwise they need to complete it first. For the second and third step we merged it into one step (create paylater plans + create the payment). The last step is waiting the callback.

### Automation Service

I'm working on automation service from scratch, currently we have cron-job in this service to send reminder notifications to users about immunizations:

1. Reminder 14 days before the immunization day
1. Reminder 4 days before the immunization day
1. Reminder on the immunization day

The cron-job itself will running every day at midnight to gathering data, and then schedule the notifacations to be send at 07:00 AM.

### Parent Service

Growth Graph
