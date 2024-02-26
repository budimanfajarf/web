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

PT Cipta Medika Informasi (PrimaKu), an application that monitors children's health, exclusively collaborates with the Indonesian Pediatric Society (IDAI). Through this application, parents can easily and quickly access information about child development and health. PrimaKu also assists pediatricians in providing the best service by involving them in monitoring child development and health through a separate application called PrimaPro.

## My Role & Responsibility

I work as a full-time Software Engineer (Backend) at PrimaKu. I have built some backend services from scratch and also contributed to existing backend services.

Below are some backend services I have contributed to while I’m working at PrimaKu:

### Core Service

Primary backend service for PrimaKu's application. There are various features I have worked on in this service, the interesting one is for authentication. One day we decided to change to a new 3rd party service to handle WhatsApp OTP to reduce our monthly costs, and I was entrusted to work on it.

The first thing I do is research and test the 3rd party service APIs, to make sure this service is capable of our needs. In the development & integration process, I intensively communicate with Customer Support (CS) when facing an issue. After completing the development & integration process, and then being tested by our Quality Assurance (QA) team, we successfully migrated the WhatsApp OTP to the new 3rd party service and reduced our monthly costs.

### Payment Service

There are a lot of payment methods we use in our application, such as Bank Transfer, Credit Card, E-Wallet, and BNPL (Buy Now, Pay Later). In the Payment Gateway itself, we use two different payment gateways to accommodate our needs. One of the payment methods I have worked on is BNPL.

The challenge part when integrating the BNPL payment method is it has complex steps rather to the other payment methods. a payment method normally just has 2 steps, create the payment and then wait for the callback, that's it.

BNPL, on the other hand, has at least 4 steps, create a customer account, create paylater plans, create the payment, and then wait for the callback. To improve the user experience and simplify the process, we reduce it into 2 or 3 steps.

The first step is checking if our user has completed their profile to fulfill the required data for creating a customer account, if it's completed the user continues to the next step, otherwise they need to complete it first. For the second and third steps, we merged them into one step (create paylater plans + create the payment). The last step is waiting for the callback.

### Automation Service

I'm working on an automation service from scratch, currently, we have a cron-job in this service to send reminder notifications to users about immunizations:

1. Reminder 14 days before the immunization day
1. Reminder 4 days before the immunization day
1. Reminder on the immunization day

The cron-job itself will run every day at midnight to gather data, and then schedule the notifications to be sent at 07:00 AM.

### Parent Service

Backend service focusing on users with a Parent role. There are various features I have worked on in this service, the challenge one was when I worked on the Growth Graph feature for children. We have to **collaborate with a professional Doctor** to implement the correct formulas, below are the formulas we have to turn into codes:

1. Weight Calculation
   - Weight for Age
   - Weight for Height
   - Body Mass Index (BMI) for Age
1. Height for Age
1. Head Circumference for Age

On top of that, we have to use different references when the child is under 5 years old or over 5 years old. For the child under 5 years old, we use the reference of WHO. For the child over 5 years old, we use the reference of CDC.

---

TLDR: I gained extensive experience while working at PrimaKu. Working in microservices, integration with various 3rd party services, collaborating with internal team and external professionals, and many more.
