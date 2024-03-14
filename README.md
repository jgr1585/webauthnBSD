# Installation Guide

## OpenBSD (Server)
- PHP (v8.2.15 or later)

## Installation
1. Download the latest release and run it
```bash
curl -LO https://github.com/jgr1585/webauthnBSD/releases/latest/download/webauthn.run
chmod +x webauthn.run
./webauthn.run
```
2. Configer the web server with `/etc/httpd.conf` [Example](#etchttpdconf)

3. Configure the config file `/var/www/htdocs/webauthn/api/init.php` to match the domain of the web server.

4. Add the cron job to the crontab
```bash
crontab -e
```
```bash
# Run the pfFileHandler script at reboot
@reboot             /opt/webauthn/pfFileHandler.sh
# Run the cleanup script every day at 00:05
5   0   *   *   *   /opt/webauthn/cron.sh
```

5. Configure pf to block all traffic to the administative port (e.g. 8080 and 22) except if the ip address is in the whitelist 'webauthn' in the `/etc/pf.conf` file
```pf
table <webauthn> persist
pass in quick proto tcp from <webauthn> to any port { 8080, 22 }
pass in quick proto udp from <webauthn> to any port { 8080, 22 }

block in quick proto tcp from any to any port { 8080, 22 }
block in quick proto udp from any to any port { 8080, 22 }
```

6. Load the new config and start all services
```bash
pfctl -f /etc/pf.conf
rcctl enable httpd
rcctl restart httpd
rcctl restart cron
rcctl restart php82_fpm
```

## Build from Source

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v20.11.0 or later)

1. Clone the repository
2. Navigate to the root directory of the project
3. Run `npm install` to install all dependencies
4. Run `npm build` to build the project
5. Copy the contents of the `build` folder to the root directory of your web server e.g. `/var/www/htdocs/www`
6. Change the config file `/etc/httpd.conf`. [Example](#etchttpdconf)
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

/opt
└── webauthn
    ├── cron.sh
    └── pfFileHandler.sh

/etc/opt
└── webauthn
    └── config.conf
```

## Exapmles

### '/etc/httpd.conf'
```c
server "default" {
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

root "/htdocs/webauthn/"

}

# Include MIME types instead of the built-in ones
types {
    include "/usr/share/misc/mime.types"
    # Necessary to ensure patch files show up as text not binary
    text/plain sig
}
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
Timestamp in UTC;IP-Address (v4/v6);Login/Logout Boolen (1-Login, 0-Logout)

Example:
```
2023-12-31T12:00:00Z;10.0.0.2;1
2023-12-31T13:00:00Z;fe80::1;1
2023-12-31T14:00:00Z;10.0.0.2;0
2023-12-31T15:00:00Z;fe80::1;0
```