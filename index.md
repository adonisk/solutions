---
title: Doc Central
description: Home for Ezetap integration related documents
layout: default
---

##Overview##

Ezetap offers a mobile point of sale (POS) solution that enables customers to collect payment anywhere, anytime and in any instrument form (cash, credit/debit card, cheque or demand draft) directly from a mobile phone. 

Here is the overview of Ezetap solution:

![eze-overview.png]({{site.baseurl}}/images/eze-overview.png)

For card payment, the customer’s credit or debit card information is captured in an EMV and PCI certified Ezetap device, either via magnetic stripe or chip card reader in the device. The Ezetap device is connected to the mobile phone via USB or Bluetooth. Customer’s card PIN is also captured in a secured PIN entry area on the device. The captured card information and PIN is securely sent via the mobile phone to Ezetap server and to the corresponding payment processors (banks) for approvals.

In addition, for certain transactions, customer’s signature is captured in a digital format directly from the mobile phone and securely stored on Ezetap servers along with the transaction details. An electronic charge slip (e-Charge) is also delivered directly to the customers via SMS or E-mail. 

The following picture depicts the transaction flow for payments:

![eze-overview.png]({{site.baseurl}}/images/eze-flow.png)

For the purpose of reconciliation, after completion of each transaction, a callback mechanism can be setup on the Ezetap server to update a customer's backend system with the transaction details. At the end of the day, for card based transactions, an automated settlement process runs at night to settle all the transactions for the day. 

An online merchant portal provides a unified access to review all the business transactions and to void or cancel customer’s transactions.




## Client Side ##

Ezetap exposes client side SDKs to enable businesses to integrate `Ezetap POS` into their existing mobile, tablet or desktop applications via a standard SDK integration.

Ezetap SDK is available in the following platforms:

1. Android (``Android 2.2 or higher``)
2. Windows (``Windows 7 and 8.1``) 

Support for other platforms will be released shortly.

### Android SDK ###
Android SDK is available in the following two flavors to get your ideas implemented with Ezetap. You can choose whichever works for you!

####Hybrid JS ####

The simpler approach is to use HTML5 skills to make a web page and when you are ready to collect payment, call a simple Javascript function. This enables you to leverage full power of Google Chrome browser on the mobile or tablet. All you need is decent grasp of HTML, CSS and Javascript. It helps a lot if you are familiar with common libraries available on the client side. As far as Ezetap integration goes, all you need to do is to call one Javascript function when you are ready, with a JSON input.

Please visit [Android SDK - Hybrid JS]({{site.baseurl}}/pages/client-android-hybrid.html) home page for more details.

####Native Android ####

Second approach is to do native Android app development. Ezetap provides an SDK that you can integrate to your app. Naturally, this requires you to  have a good grasp of Android app development, building APKs etc. Ezetap integration involves setting up a project, importing a library and then actual coding involves few lines of code. Upside of this is that you get all features available on the native platform and you are not limited by the browser.

Please visit [Android SDK - Native]({{site.baseurl}}/pages/client-android-native.html) home page for more details.

### Windows SDK ###

On the Windows platform, Ezetap windows SDK is currently supported in Windows 7 and 8.1 versions. The SDK is  is implemented in C# and is available as a standard .NET library (version 4.5). It can be integrated into any existing .NET application as a DLL included as a project reference.

Please visit [Windows SDK]({{site.baseurl}}/pages/client-windows.html) home page for more details.

##Server Side##

###Merchant Portal###

Merchant portal gives you access to all the transactions posted on Ezetap server as well as other configurations related to merchants and users. Based on the user's role and access privilege, he or she can perform various activities on the transaction like void, refund etc. 

Please visit [Merchant Portal]({{site.baseurl}}/pages/server-merchant-portal.html) home page for more details.

###Notification API###
Ezetap exposes a Notification API as a callback for customer's to receive notification of payment transactions (success or failure). This can be used for reconciling customer's backend systems with Ezetap payment transaction details. Any references passed to Ezetap SDK at the client end as part of a payment transaction will be sent in via the callback API as well.

Please visit [Notification API]({{site.baseurl}}/pages/server-notification-api.html) home page for more details.
