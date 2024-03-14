#!/bin/sh

#Check if the user is root
if [[ $(id -u) -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# Check if build directory exists
if [ -d "./build" ]; then
   mkdir -p /var/www/htdocs/webauthn
   cp -r build/* /var/www/htdocs/webauthn
fi

#Create the directory for the scripts
mkdir /var/www/usr/webauthn
mkdir /var/www/usr/webauthn/config
mkdir /var/www/usr/webauthn/keys
mkdir /var/www/usr/webauthn/logs

touch /var/www/usr/webauthn/logs/webauthn.log

chown -R www:www /var/www/usr/webauthn
chmod -R 550 /var/www/usr/webauthn
chmod -R 770 /var/www/usr/webauthn/keys
chmod -R 770 /var/www/usr/webauthn/logs

#Copy the scripts to the directory
mkdir -p /opt/webauthn
cp ./cron.sh /opt/webauthn
cp ./pfFileHandler.sh /opt/webauthn

chmod -R 555 /opt/webauthn

#Copy the configuration file to the directory
mkdir -p /etc/opt/webauthn

cp ./config.conf /etc/opt/webauthn

chmod 777 /etc/opt/webauthn/config.conf

#Copy httpd.conf to /etc/httpd.conf if it does not exist
if [ ! -f /etc/httpd.conf ]; then
   cp ./httpd.conf /etc/httpd.conf

   #Generate a self-signed certificate if it does not exist
   if [ ! -f /etc/ssl/private/webauthn.key ] && [ ! -f /etc/ssl/webauthn.crt ]; then
      openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/private/webauthn.key -out /etc/ssl/webauthn.crt -days 365 -nodes -subj "/C=AT/ST=Voralber/L=Dornbirn/CN=webauthn.local"
   fi
fi
