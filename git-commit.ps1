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

# 2. Automatically continue with commit
Write-Host "`n2. Automatically continuing with commit..." -ForegroundColor Cyan

# 3. Add all changed files
Write-Host "`n2. Adding all changed files..." -ForegroundColor Cyan
git add .

# 4. Generate automatic commit message based on changes
Write-Host "`n3. Generating commit message based on changes..." -ForegroundColor Cyan

# Get changes
$changes = git status --porcelain

# Initialize change type arrays
$addedFiles = @()
$modifiedFiles = @()
$deletedFiles = @()
$renamedFiles = @()

# Process each change
foreach ($change in $changes) {
    $changeType = $change.Substring(0, 2).Trim()
    $fileName = $change.Substring(3).Trim()
    
    switch ($changeType) {
        'A' {
            $addedFiles += $fileName
        }
        'M' {
            $modifiedFiles += $fileName
        }
        'D' {
            $deletedFiles += $fileName
        }
        'R' {
            $renamedFiles += $fileName
        }
    }
}

# Generate commit message parts
$commitParts = @()

if ($addedFiles.Count -gt 0) {
    $commitParts += "Add: $($addedFiles -join ', ')
" + 
                   "添加了新文件: $($addedFiles -join ', ')"
}

if ($modifiedFiles.Count -gt 0) {
    $commitParts += "Update: $($modifiedFiles -join ', ')
" + 
                   "更新了文件: $($modifiedFiles -join ', ')"
}

if ($deletedFiles.Count -gt 0) {
    $commitParts += "Delete: $($deletedFiles -join ', ')
" + 
                   "删除了文件: $($deletedFiles -join ', ')"
}

if ($renamedFiles.Count -gt 0) {
    $commitParts += "Rename: $($renamedFiles -join ', ')
" + 
                   "重命名了文件: $($renamedFiles -join ', ')"
}

# Combine parts into final commit message
if ($commitParts.Count -gt 0) {
    $commitMessage = $commitParts -join "

" + 
                    "

Auto commit generated at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
} else {
    $commitMessage = "No changes to commit $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

Write-Host "`nGenerated commit message:`n$commitMessage" -ForegroundColor Cyan

# 5. Perform commit
Write-Host "`n4. Performing commit..." -ForegroundColor Cyan
git commit -m "$commitMessage"

# 6. Push to remote repository
Write-Host "`n5. Pushing to remote repository..." -ForegroundColor Cyan
git push origin stage

Write-Host "`n=== Commit completed successfully! ===" -ForegroundColor Green