# Installation Guide

## Prerequisites
- [Node.js](https://nodejs.org/en/) (v20.11.0 or later)


## Installation
1. Clone the repository
2. Navigate to the root directory of the project
3. Run `npm install` to install all dependencies
4. Run `npm build` to build the project
5. Copy the contents of the `build` folder to the root directory of your web server e.g. `/var/www/htdocs/www`
6. Change the config file `/etc/httpd.conf`. Example:
    ```
    server "default" {
        listen on * port 80
        listen on * tls port 443

        # Optional, but probably best - change your syslog.conf to do
        # what you want with it then.
        # log syslog
        log access "error.log"
        log error "error.log"
        log style forwarded

        tls {
            key "/etc/ssl/private/server.key"
            certificate "/etc/ssl/server.crt"
        }

        location "/api/*.php" {
            fastcgi socket "/run/php-fpm.sock"
        }

	    location "/static/*" {
	        directory auto index
        }

        #Enable the register Side
        location "/register" { 
            request strip 1
        }

	root "/htdocs/www/"

    }

    # Include MIME types instead of the built-in ones
    types {
        include "/usr/share/misc/mime.types"
        # Necessary to ensure patch files show up as text not binary
        text/plain sig
    }
    ```
7. Change the setting inside the `public/api/init.php` file to match the domain of the web server
8. Run the `install.sh` script from the scripts folder to create the required folders with the correct permissions
9. Restart the web server e.g. `doas rcctl restart httpd`

## Folder Structure
```
/var/www/.
├── htdocs
│   └── www
│       └── (contents of build folder)
├── logs
└── usr
    └── webauthn
        ├── config
        ├── keys
        └── logs
```

## Required OS (Client)
- Windows 11 (23H2)
- macOS 13 (Ventura)
- Linux (Only supported inside a browser)

- Android 9 (Pie) or later
- iOS 16 (Apple Devices only)
- iOS 17 (all devices)

https://www.passkeys.io/compatible-devices

## Registering a new User
1. Navigate to the register page of the web server e.g. `https://localhost:8080/register`
2. Enter an username and a Display Name
3. Click on the `Register` button

## Testing without a vaild SSL Certificate (only for Chromium based browsers)
1. Enable virtual authentication environment by following the instructions on https://developer.chrome.com/docs/devtools/webauthn#open_the_webauthn_tab
2. Enable the checkbox is enought to test the application

### Virual Authenticator
To create a new virtual authenticator to make testing easier. This is not required for testing and not recommended for production use.
- Protocol: ctap2
- Transport: ble
- Supportes resident key: true
- Supports user verification: true
- Supports large blobs: (optional)

## Log File Structure
Timestamp in UTC;Username;IP-Address (v4/v6);Login/Logout Boolen (1-Login, 0-Logout)

Example:
```
2023-12-31T12:00:00Z;jon.doe#1;10.0.0.2;1
2023-12-31T13:00:00Z;jon.doe#2;fe80::1;1
2023-12-31T14:00:00Z;jon.doe#1;10.0.0.2;0
2023-12-31T15:00:00Z;jon.doe#2;fe80::1;0
```