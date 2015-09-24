---
title: Merchant Portal
description: Understanding Merchant Configuration Settings
type: Server Side
layout: default
---

The Merchant portal is a one-stop portal to view all transactions performed under the merchant account as well as merchant account related setups like users, devices and other assets tied to the merchant. Access to the merchant portal is restricted to `Admin` role only. In addition, some of the merchant configuration options are available only to Ezetap `Support administrators`.

###Login

Login to the [Merchant portal](http://d.eze.cc/portal/login/) using your phone number and password. If you do not have access to the portal via your login, please contact Ezetap support.

###Users
Users associated with your merchant profile can be viewed only by the administrator associated with your merchant. A user typically has one or more roles associated, which grant certain privileges in the system

| User Role          | Access Privileges |
| ------------------ | ----- |
| Agent              | Can transact using the PoS application.Cannot void transactions or access the portal |
| Agent (with Void)  | Can transact and also void transactions created by him or her |
| Agent(With Portal) | Can access the Merchant portal and review his or her transactions |
| Admin              | Can access the portal, review transactions across all users, review user information, void transactions across all users, view devices associated with his organization and view application keys generated for his merchant profile |
| Refund             | Allows a user to process refund transactions for previously settled transactions|

###Merchant Configuration
A merchant can be configured to allow or disable various payment related operations and features. Some of the common features that can be configured at the merchant configuration are as follows:

| Configuration    | Description|
| ---------------- | -----------|
| Enable SMS Receipt            | Enable or disable sending SMS receipt for card transactions |
| Enable Email Receipt          | Enable or disable sending email receipt for card transactions |
| Minimum amount per transaction| Minimum permissible amount for all transaction types |
| Maximum amount per transaction| Maximum permissible amount for all transaction types |
| Enable Cash Payment           | Enable or disable cash payment |
| Enable SMS Receipt For Cash   | Enable or disable sending SMS receipt for cash transactions |
| Enable Cheque Payment         | Enable or disable cheque payment |
| Enable SMS Receipt For Cheque | Enable or disable sending SMS receipt for cheque transactions |
| Enable Refund                 | Enable refunds |
| Enable EMI                    | Enable EMI option |
| Enable Cash Back              | Enable or disable cash bach for transactions |
| Minimum Amount For Cash back  | Minimum permissible amount for cash back |
| Maximum Amount For Cash back  | Maximum permissible amount for cash back | 
| Allow zero value transactions | Allow zero value transactions |

> Only Ezetap `support administrtors` hav access to the merchant configuration. Customers can request to enable or disable certain features at the merchant level by working with Ezetap support. 


###App Keys
This screen allows an administrator to review application keys that have been generated on behalf of your merchant profile. The application key gives a merchant specific handle for authentication using any custom applications built for your organization, when calling the SDK APIs.

###Assets
The assets screen lets an administrator review the status of all Ezetap devices associated with his or her organization. The administrator can activate or deactivate devices, review when a transaction was last performed on a particular device and the user associated with the device.

###Review Transactions
If you are a merchant administrator, the transactions screens lets you filter transactions for your organization by date range, device serial number and specific users. You can drill down on specific transaction, review transaction details, and void them if required.

If you are an agent, you will be able to review only those transactions associated with your Ezetap device.

<img src="{{site.baseurl}}/images/transactions.png" alt="Transactions" style="max-width: 100%;"/>
