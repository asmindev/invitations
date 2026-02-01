#!/bin/bash

# Script to sync template files to public directory
# Use this if server doesn't allow symlinks

echo "🔄 Syncing template files..."

# Check if source directory exists
if [ ! -d "marcelisa.katsudoto.id" ]; then
    echo "❌ Error: marcelisa.katsudoto.id directory not found!"
    exit 1
fi

# Remove symlink if exists
if [ -L "public/template" ]; then
    echo "🗑️  Removing existing symlink..."
    rm public/template
fi

# Remove directory if exists
if [ -d "public/template" ]; then
    echo "🗑️  Removing existing directory..."
    rm -rf public/template
fi

# Create directory
mkdir -p public/template

# Copy files
echo "📦 Copying files..."
cp -r marcelisa.katsudoto.id/* public/template/

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 public/template

echo ""
echo "✅ Template files synced successfully!"
echo "📁 Files copied from marcelisa.katsudoto.id/ to public/template/"
echo ""
echo "Checking structure:"
ls -lh public/template/
