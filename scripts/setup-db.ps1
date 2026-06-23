# BentaHub Database Setup Script for Windows
# Run as Administrator

param(
    [string]$PostgresUser = "postgres",
    [string]$PostgresPassword = "password",
    [string]$DbName = "bentahub"
)

Write-Host "🚀 BentaHub Database Setup (Windows)" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check if PostgreSQL is installed
$pgPath = "C:\Program Files\PostgreSQL\*\bin\psql.exe"
$pgExe = Get-Item $pgPath -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $pgExe) {
    Write-Host "❌ PostgreSQL not found in default location." -ForegroundColor Red
    Write-Host "Please ensure PostgreSQL is installed and in PATH." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL found at: $($pgExe.FullName)" -ForegroundColor Green
Write-Host ""

# Test connection
Write-Host "Checking PostgreSQL connection..." -ForegroundColor Cyan
$env:PGPASSWORD = $PostgresPassword

try {
    & $pgExe.FullName -U $PostgresUser -h localhost -c "SELECT 1" | Out-Null
    Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
}
catch {
    Write-Host "❌ PostgreSQL connection failed." -ForegroundColor Red
    Write-Host "Make sure PostgreSQL is running and credentials are correct." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Create database
Write-Host "Creating database '$DbName'..." -ForegroundColor Cyan
try {
    & $pgExe.FullName -U $PostgresUser -h localhost -c "CREATE DATABASE $DbName;" -ErrorAction SilentlyContinue
    Write-Host "✅ Database created (or already exists)" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Could not create database (it may already exist)" -ForegroundColor Yellow
}

Write-Host ""

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Cyan
npm run db:push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Migration failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Update .env.local with your configuration" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host ""
