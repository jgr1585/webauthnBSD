#!/bin/sh

#Check if the user is root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

#Create the directory for the scripts
mkdir /var/www/usr/webauthn
mkdir /var/www/usr/webauthn/config
mkdir /var/www/usr/webauthn/keys
mkdir /var/www/usr/webauthn/logs

chown -R www:www /var/www/usr/webauthn
chmod -R 440 /var/www/usr/webauthn
chmod -R 640 /var/www/usr/webauthn/keys
chmod -R 640 /var/www/usr/webauthn/logs
