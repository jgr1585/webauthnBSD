#!/bin/sh

# Load the configuration file
. /etc/opt/webauthn/config.conf

tail -n 0 -f $LOG_PATH | while read -r line; do

    # Check for a valid Timestamp (ISO 8601)
    regexDate='[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]Z'

    # Description for the Regex
    # https://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses#answer-17871737
    regexIPv4='((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])'
    regexIPv6='(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))'
    
    regexLogin='[0-1]'

    # Why? Safety first!
    echo "$line" | grep -Eq "^$regexDate;($regexIPv4)|($regexIPv6);$regexLogin$" || continue

    printf "%s\n" "$line" | while IFS=';' read -r date ip login; do

        echo "Field 1: $date"
        echo "Field 2: $ip"
        echo "Field 3: $login"
        # Additional processing for other fields if needed

        pfctl -q -t $TABLE_NAME -T add $ip
        
        # Refresh the config file
        pfctl -q -f /etc/pf.conf
    done
done