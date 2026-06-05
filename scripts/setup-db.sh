#!/bin/bash

# BentaHub Database Setup Script

echo "🚀 BentaHub Database Setup"
echo "=========================="

# Check if PostgreSQL is running
echo "Checking PostgreSQL connection..."
psql -U postgres -h localhost -c "SELECT 1" > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL and try again."
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database
echo "Creating database..."
createdb -U postgres bentahub 2>/dev/null

# Run Drizzle migrations
echo "Running migrations..."
npm run db:push

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo ""
