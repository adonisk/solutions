---
title: Android - Hybrid JS
description: Integrating a hybrid HTML5 app (Web view) into Ezetap using JS
type: Client Side
layout: default
---

If you are familiar with HTML5 development for mobile friendly websites, Ezetap provides a Webview that can be used to quickly override the default data capture screens of Ezetap basic mPOS application. You can even host the page yourself and provide Ezetap with the URL. Ezetap configures the app for your account to override the default screens with a `WebView` which is loaded with the contents of your URL.

When you are ready to collect payment, you can collect the fields required and call Ezetap Javascript bridge which is exposed by simple Javascript methods.

## What you need to get started

1. Android phone that can connect to internet. Recommended to use Android 4.0.4 or above.
1. This documentation, familiarity with HTML and Javascript
1. Some place to host your page
1. Login credentials to Ezetap service
1. Ezetap [mPOS Application TODO](#)
1. Ezetap device to test

## Sample Application

Easiest way to get started is to head over to [reference sample application](http://d.eze.cc/mposui/custom_webview.html) and do a view-source.

All the fields in that page that starts with `ezetap_` are the fields that Ezetap understands. For doing a payment, Ezetap requires only one fields as mandatory - `ezetap_amount`.

There is no need to keep the field names as it is there in the sample. Finally, the code you need to call is 

	``javascript
	var paymentJson = {'ezetap_amount':1.0}; 
	//this is for a sample amount of 1.0. Additional fields you can pass include the following.
	//ezetap___ref: for your reference number
	//ezetap_name: your customer's name
	//There are more fields - look at the form. Use these if you need to.
	Ezetap.doCardPayment(JSON.stringify(paymentJson));

## Recommended Development Strategy

1. Install [Google Chrome Desktop Browser](https://www.google.com/chrome/browser/)
1. Enable [Mobile Device Emulation](https://developer.chrome.com/devtools/docs/mobile-emulation)
1. Use standard libraries like (Bootstrap)[http://getbootstrap.com/css], (JQuery)[http://jquery.com] etc. For development, include stuff from http://cdnjs.com/ rather than local.
1. Develop your mobile UI. Leave a button as placeholder to call Ezetap. Test your UI using mobile device emulation.
1. Hookup your button for `Ezetap.doCashPayment`. This enables you to test your idea without needing an Ezetap device. You will still need Ezetap application on an Android phone for this though.
1. If that is working, just change the code to `Ezetap.doCardPayment`. There is no other change in your code and now you can test with the device.

