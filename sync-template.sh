#!/bin/bash

# Script to sync template files to public directory
# Use this if server doesn't allow symlinks

echo "Syncing template files..."

# Remove symlink
if [ -L "public/template" ]; then
    rm public/template
fi

# Copy files
rsync -av --delete marcelisa.katsudoto.id/ public/template/

echo "✅ Template files synced successfully!"
