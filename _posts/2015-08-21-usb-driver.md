---
title: USB Driver Not Working in Windows
---

In Windows 7, 8, 8.1 PCs, perform following steps if a V2.1 device is not detected as a winusb device under usb devices in Device Manager:

	1.	Open regedit.exe (Registry Editor) as Administrator
	2.	Click on HKEY_LOCAL_MACHINE -> SYSTEM -> CurrentControlSet -> Control -> usbflags
	3.	Under usbflags identify our device which looks like 042504070002. Delete it.
	4.	Then go to device manager and update driver software with automatic search option.
	5.	Let windows pick driver software and then it installs as winusb under Universal Serial Bus devices.
	6.	Reset V2.1 device and then connect again.
	7.	Use V2.1 to connect as USB device.
