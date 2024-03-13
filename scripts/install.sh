#!/bin/sh

#Check if the user is root
if [[ $EUID -ne 0 ]]; then
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

chown -R www:www /var/www/usr/webauthn
chmod -R 550 /var/www/usr/webauthn
chmod -R 770 /var/www/usr/webauthn/keys
chmod -R 770 /var/www/usr/webauthn/logs

touch /var/www/usr/webauthn/logs/webauthn.log

#Copy the scripts to the directory
mkdir -p /opt/webauthn
cp ./cron.sh /opt/webauthn
cp ./pfFileHandler.sh /opt/webauthn

chmod -R 555 /opt/webauthn

#Copy the configuration file to the directory
mkdir -p /etc/opt/webauthn

cp ./config.conf /etc/opt/webauthn

chmod 777 /etc/opt/webauthn/config.conf

#Copy the rc.d script to the directory
cp ./webauthn /etc/rc.d/webauthn

chmod 555 /etc/rc.d/webauthn

#Enable the service
rcctl enable webauthn
rcctl start webauthn
