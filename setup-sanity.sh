#!/bin/bash

echo "🚀 AB Wall Wonders - Sanity CMS Setup"
echo "======================================"
echo

# Check if we're in the right directory
if [ ! -d "sanity-backend" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "📋 Setup Steps:"
echo "1. Create account at sanity.io"
echo "2. Create new project named 'AB Wall Wonders CMS'"
echo "3. Copy your Project ID"
echo "4. Run this script with your Project ID"
echo

# Check if project ID is provided
if [ -z "$1" ]; then
    echo "❓ Usage: ./setup-sanity.sh YOUR_PROJECT_ID"
    echo
    echo "💡 Get your Project ID from:"
    echo "   - sanity.io → Your Project → Settings → Project ID"
    echo
    exit 1
fi

PROJECT_ID=$1

echo "���� Setting up Sanity with Project ID: $PROJECT_ID"
echo

# Update sanity.config.ts
echo "📝 Updating sanity-backend/sanity.config.ts..."
sed -i.bak "s/projectId: 'your-project-id'/projectId: '$PROJECT_ID'/" sanity-backend/sanity.config.ts

# Update client sanity.ts
echo "📝 Updating client/lib/sanity.ts..."
sed -i.bak "s/projectId: 'your-project-id'/projectId: '$PROJECT_ID'/" client/lib/sanity.ts

echo "✅ Configuration updated!"
echo

# Install dependencies if needed
echo "📦 Installing Sanity dependencies..."
cd sanity-backend
npm install
cd ..

echo
echo "🎉 Setup Complete!"
echo
echo "📍 Next Steps:"
echo "1. Start Sanity Studio:"
echo "   cd sanity-backend && npm run dev"
echo "   → Open http://localhost:3333"
echo
echo "2. Start your website:"
echo "   npm run dev"
echo "   → Open http://localhost:8080"
echo
echo "3. Add projects in Sanity Studio and watch them appear on your website!"
echo
