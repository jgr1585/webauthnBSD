#!/bin/sh

# Load the configuration file
. /etc/opt/webauthn/config.conf

pfctl -q -t $TABLE_NAME -T expire $EXPIRE_TIME
pfctl -q -f /etc/pf.conf
