---
title: Windows SDK
description: Integrating windows application using a .NET SDK
type: Client Side
layout: default
---

This section is for people who have existing windows applications (ver 7 or 8.1) running on a desktop and planning to integrate Ezetap PoS solution using a standard windows.NET SDK.

> **Note:** If you are looking for a standalone PoS solution for windows, please refer `Ezetap Windows PoS` documentation
 
 
####What do you need to get started####

	1. A Visual Studio .NET development environment
	2. A Windows tablet / desktop (with a connection to internet) to test the application 
	3. A DEMO merchant setup and login credentials to Ezetap service
	4. Ezetap device connected to the tablet / desktop via USB
	5. Downloaded Ezetap Windows SDK

##[Download SDK]({{site.download_url}}/client-sdk/windows/eze_sdk_win_0_0_7.zip)##

You can download the latest version of Ezetap Windows SDK by clicking the link above. Ezetap support team will set up and communicate with the necessary Merchant account, AppKey and other details for you.

###Package Components###

The Ezetap Windows SDK package contains the following components.

1. `eze_pos_win_0_0_7.exe`: This self extracting executable installs a basic windows pos application as well as some core binaries required for the windows SDK to integrate Ezetap payment solution into your application.
2. `eze_api_win_0_0_7.zip`: This zip file contains a .NET DLL along with dependent libraries. Extract this set of DLLs into a folder visible to your Visual Studio project and add them as dependent libraries in your Visual Studio project.
3. `eze_api_win_sample_0_0_7.zip`: This zip file contains a code sample for how to use the ezetap windows API.

Note: The Ezetap Windows SDK is compatible with `DotNET version 4.5 or higher` 

###Visual Studio Setup###

Once the Ezetap API DLLs are imported in the Windows .NET Visual Studio project, you should have references for the libraries in your project and you can use the API as any other .NET library call, native to your .NET environment. 

## API Documentation ##

The primary interface to the API is through a Singleton class called `EzeAPI`. The following section describes the operations available on EzeAPI for performing various payment related transactions:

	public class EzeAPI
	{
		public static EzeAPI create(ServerType serverType);
		public static EzeResult login(LoginMode mode, String userName, String passkey);
		public EzeResult prepareDevice(); 
		public EzeResult takePayment(PaymentType type, double amount, PaymentOptions options); 
		public EzeResult attachSignature(string txnId, ImageType imageType, ByteString imageData, int height, int width, double tipAmount);
		public void setMessageHandler(EzeNotification handler);
		private EzeAPI logout();
		public static void destroy();
	}

	
###Class EzeAPI###

This section documents the operations and attributes available on the EzeAPI

####Create####

        public static EzeAPI create(ServerType serverType)

The first operation exposed on the API is the Create() method. It is used to create an instance of the EzeAPI object against with the other methods are invoked. EzeAPI instance can be created either in DEMO or PROD modes by passing the corresponding ServerType enum. This method returns a singleton instance of EzeAPI object, which should be stored and used to perform all other operations.

See the [Enumerations](#Enumerations) section for more details on the Enums. 


####Login####

	    public EzeResult login(LoginMode mode, String userName, String passkey) 

This method is used to login to Ezetap server. It accepts the following parameters. 



| Input Field | Type | Description |
|------------ |----  |-----------|
| LoginMode   |Input | This is a required field with 2 values PASSWORD or APPKEY. When LoginMode is ``PASSWORD``, *userName* and *Passkey* fields are used for authenticating the individual users' credentials against the merchant account. Only valid users in the merchant account are allowed to login. When LoginMode is ``APPKEY``, the appKey registered with the merchant (*provided to the merchant along with Ezetap setup documentation*) should be passed in the *passKey* field. *userName* is not validated against the merchant, but it is stored along with the payment details for all transactoins.  |
| userName    |Input  | A valid userName in the merchant account |
| passkey     |Input  | When *LoginMode* is *PASSWORD*, individual users' password should be passed in this field. For *APPKEY*, the merchant's *appKey* should be passed in this field. |
| EzeResult   |Output | returns the details of the login transaction. | 

Please refer [EzeResult](#EzeResult) section for the details of the response


####Prepare Device####

	    public EzeResult prepareDevice() 

Prepare device method should be invoked to prepare the Ezetap device for card transaction. During this method call, the EzeAPI downloads specific security keys from the acquiring bank, without which the card transactions will fail. Prepare device should be called at the following instances:

1.  Everyday when the user logs in to Ezetap API for the first time 
2.  Device wakes up from sleep or startup after a shutdown

> Note: If the EzeAPI returns an error related to *device not ready* during postPayment() transaction, please implement an option for the user to prepare the device as needed.

####Take Payment####

	    public EzeResult takePayment(PaymentType type, double amount, PaymentOptions options) 

Take payment is the primary interface for payment transactions. TakePayment interacts with the device to enter the card details, PIN etc if it is a card payment, works with the Ezetap server and returns an `EzeResult`. Details regarding values of PaymentType and PaymentOptions classes can be found below in the respective class details. 

This method takes the following parameters:

| Field Name     | Type    | Description |
|--------        | --------| ----------- |
|paymentType     | Input   | This enum defines the different payment types that are accepted by the API |
| amount         | Input   | `double` value of the payment amount field |
| paymentOptions | Inupt   | This class contains the details of payment transaction, pecific to different payment types|
| EzeResult      | Output  | holds the result of the transaction as well as the details related to the specific transaction including transcation Id, MID, TID, authCode, orderId, reference number etc| 


####Attach Signature####

        public EzeResult attachSignature(string txnId, ImageType imageType, ByteString imageData, 
				int height, int width, double tipAmount)

AttachSignature is an optional method is can be invoked after a successful payment transaction to capture store the digital signature of the paying customer. Digital signature is not required for all transactions, but it is dictated, mostly by the banks for specific kind of card transactions. In addition, merchants can enforce a digital signature for other payments like card and/or cheque based on their business needs. EzeAPI allows to capture the signature, which will be stored on the Ezetap server along with the other transaction details. 

| Field Name | Type    | Description |
|--------    | --------| ----------- |
| txnId		   | Input   | Transaction id of the successful payment transaction. It is returned when calling a `takePayment` method |
| imageType  | Input   | Enum representing the type of image (BMP, JPEG, PNG etc). See details below |
| imageData  | Input   | A bytestring representation of the raw signature image data |
| height     | Input   | `integer` representing the height of the image in pixels |
| width      | Input   | `integer` representing the width of the image in pixels |
| tipAmount  | Input   | (optional) `double` value of the tip amount if entered while taking signature |
| EzeResult  |Output   | returns the result of the attachSignature method invocation | 


####Set Message Handler####

        public void setMessageHandler(EzeNotification handler)

Ezetap Windows SDK is a state machine that interacts with the device and Ezetap server passing different data elements during the various method invocations on the EzeAPI. During this period, various events and notifications are generated. If the calling windows application likes to be notified of these events and notifications, they can set the message handler. EzeAPI will register this handler and notify the calling applications of these events.

``public delegate void EzeNotification(String notifyMessage, EventArgs args);``
	
**Note**: EzeNotification is a delegate method. Any method conforming to this method signature can be
	passed by the calling application.

####Logout####

        private EzeAPI logout()

Logout method is used to log out a user from the API. This method is used in a situation when multiple users are needing to use the API. While the API will be instantiated and continuously running, individual users will log in and out of the API using the login and logout methods. When using the APPKEY mode to login, there is no need to logout. Instead, destroy() method is recommended to be used to close down the API.


####Destroy####

        public static void destroy()

This is the last operation that should be invoked on the Ezetap SDK to destroy the EzeAPI instance. This method closes the connection to Ezetap server, relinquishes the connection to the device and gracefully exists from the API.

###Class PaymentOptions###

This class is used in the `takePayment` method to pass in the optional parameters for specific payment types.

	public class PaymentOptions 
	{
		public PaymentOptions setOrderId(string orderId);
		public PaymentOptions setReceiptType(string receiptType);
		public PaymentOptions setChequeNo(string chequeNo);
		public PaymentOptions setBankCode(string bankCode);
		public PaymentOptions setChequeDate(String chequeDate);
	}

| Field Name |  Description |
|--------    |  ----------- |
| orderId		 | unique orderId the payment transaction. This links to the order for which the payment is taken| 
| receiptType| electronic or paper receipt |
| chequeNo   | cheque number for a cheque payment |
| bankCode   | IFSC bank code for a cheque payment |
| chequeDate | cheque date for a cheque payment |

###Class EzeResult###

EzeResult is returned whenever a response is returned to the user while invoking the EzeAPI. 

	public class EzeResult 
	{
		public PaymentResult getPaymentResult();
	  public EventName getEventName();
		public Status getStatus();
		public string getCode();
		public string getMessage();
	}


It contains the following methods:


| Attribute    | Description |
|-----------|-------------|
| paymentResult | an instance of paymentResult object that contains the details of the payment transaction |
| eventName     | Enum representing the API method invoked 
| status        | Status enum representing the status of the transaction. Valid values are SUCCESS or FAILED.  |
| code          | Ezetap error code representing the problem |
| message       | Message representing the details, in case of an error |

Please See [PaymentResult](#PaymentResult) for details on paymentResult class and [Enumerations](#Enumerations) for the different Enumerations used.

###Class PaymentResult###

EzeResult is returned whenever a response is returned to the user while invoking the EzeAPI. 

	public class PaymentResult 
	{
    	public string getPmtType();
    	public string getStatus();
    	public string getTxnId();
    	public double getAmount();
			public string getSettlementStatus();
    	public bool getVoidable();
    	public string getChequeNo();
    	public string getChequeDate();
    	public string getAuthCode();
    	public string getCardType();
    	public string getOrderId();
    	public string getTid();
    	public string getMid()
	}

The methods available on this class and their details are given below:


| Method    | Description |
|-----------|-------------|
| pmtType   | Payment type of the transaction (Cash, Card or Cheque)  |
| status    | Status enum representing the status of the transaction. Valid values are SUCCESS or FAILED.  |
| txnId     | Unique ID of the transaction | 
| amount    | Amount of the transaction | 
| settlementStatus| Settlement status of the txn (Pending / Settled) | 
| voidable  | Boolean indicating whether transaction is voidable | 
| chequeNo  | Cheque No passed in (only for Cheque txns) | 
| chequeDate| Cheque Date passed in (only for Cheque txns) | 
| authCode  | Auth code of the card txn | 
| cardType  | Card type of the card txn (Credit / Debit) | 
| orderId   | Order Id for the transaction, passed in by the caller during the payment transaction |
| tid	      | TID (Terminal Id) provided by the Bank for the specific terminal device of the merchant |
| mid       | MID (Merchant Id) provided by the Bank for the merchant account |


###Enumerations###

The following section documents all the enumerations that are available for use while invoking the Ezetap SDK.

####ServerType####

ServerType enum is passed while creating the EzeAPI instance. You can either pass PROD or DEMO values. This enum configures the API to either work with the production or DEMO version of the Ezetap Service.

    public enum ServerType
    {
        PROD, DEMO
    }

####LoginMode####

Users can login to the EzeAPI using either username/password or APPKEY. When  using username/password, the LoginMode is set to PASSWORD and the individual user is authenticated using the users login credentials against the merchant. When using APPKEY, authentication is performed against the APPKEY present in the merchant account.

    public enum LoginMode
    {
        PASSWORD, APPKEY
    }

####Status####

Status enum is returned as part of EzeResult that indicates if a an API call was successful or failed. 

    public enum Status 
    {
        SUCCESS, FAILURE
    }

####PaymentType####

PaymentType enum is passed as input to takePayment() API call and can accept CARD, CASH or CHEQUE as valid payment types

    public enum PaymentType
    {
        CARD, CASH, CHEQUE
    }

####ImageType####

ImageType enum is used in the attachSignature() API call for passing eSignature data in one of the acceptable image formats. 

    public enum ImageType
    {
        PNG, GIF, JPEG, BMP
    }

####EventName####

EventName enum is returned as part of the EzeResult object indicating the different API method calls invoked on EzeAPI

    public enum EventName
    {
        LOGIN, LOGOUT, EXIT, PREPARE_DEVICE, NOTIFICATION, TAKE_PAYMENT, CREATE, SET_SERVER_TYPE, 
				SEND_RECEIPT, ATTACH_SIGNATURE, OTHER
    }
