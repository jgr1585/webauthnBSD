#!/bin/sh

# Define the name of the self-extracting archive
output_file="webauthn.run"

# Create the self-extracting script
cat > "$output_file" << 'EOF'
#!/bin/sh

# Check if the user is root
if [[ $(id -u) -ne 0 ]]; then
    echo "This script must be run as root" 
    exit 1
fi

# Create a temporary directory
temp_dir=$(mktemp -d)
trap "rm -rf $temp_dir" EXIT

# Extract files into the temporary directory
ARCHIVE=`awk '/^__ARCHIVE_BELOW__/ {print NR + 1; exit 0; }' "$0"`
tail -n+$ARCHIVE "$0" | xz -d | tar -xf - -C "$temp_dir"

# Run install script
cd "$temp_dir"
./install.sh

# Cleanup
rm -rf "$temp_dir"

exit

__ARCHIVE_BELOW__
EOF

# Get the script's filename
script_name=$(basename "$0")

# Append the contents of the current directory to the script
tar cf - --exclude="$script_name" . | xz -9e -c - >> "$output_file"

# Make the script executable
chmod +x "$output_file"

echo "Self-extracting archive created: $output_file"

