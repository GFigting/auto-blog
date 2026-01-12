<#
.SYNOPSIS
    GitHub Commit Automation Script
.DESCRIPTION
    Automates the Git commit process including status check, staging, committing, and pushing to remote repository
.NOTES
    File: git-commit.ps1
    Version: 1.0
    Author: AI Assistant
    Created: 2024-01-XX
#>

# Set error handling
$ErrorActionPreference = "Stop"

Write-Host "=== GitHub Commit Automation ===" -ForegroundColor Green

# 1. Check current Git status
Write-Host "`n1. Checking current Git status..." -ForegroundColor Cyan
git status

# 2. Ask user to continue
$continue = Read-Host "`nContinue with commit? (Y/N)"
if ($continue -ne "Y" -and $continue -ne "y") {
    Write-Host "`nCommit cancelled." -ForegroundColor Yellow
    exit 0
}

# 3. Add all changed files
Write-Host "`n2. Adding all changed files..." -ForegroundColor Cyan
git add .

# 4. Get commit message
$commitMessage = Read-Host "`n3. Please enter commit message"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    Write-Host "`nCommit message cannot be empty. Commit cancelled." -ForegroundColor Red
    exit 1
}

# 5. Perform commit
Write-Host "`n4. Performing commit..." -ForegroundColor Cyan
git commit -m "$commitMessage"

# 6. Push to remote repository
Write-Host "`n5. Pushing to remote repository..." -ForegroundColor Cyan
git push origin stage

Write-Host "`n=== Commit completed successfully! ===" -ForegroundColor Green