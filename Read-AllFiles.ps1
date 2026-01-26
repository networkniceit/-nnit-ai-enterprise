# Read-AllFiles.ps1
# PowerShell script to read and display all files in the repository
# Automatically creates files if they don't exist

param(
    [string]$Path = ".",
    [switch]$CreateIfMissing,
    [string[]]$RequiredFiles = @()
)

Write-Host "=== Reading All Files in Repository ===" -ForegroundColor Cyan
Write-Host "Path: $Path" -ForegroundColor Yellow
Write-Host ""

# Get all files matching patterns
$allFiles = Get-ChildItem -Path $Path -Recurse -File | 
    Where-Object { 
        $_.FullName -notmatch '[\\/]\.git([\\/]|$)'
    } |
    Sort-Object FullName

if ($allFiles.Count -eq 0) {
    Write-Host "No files found in the repository!" -ForegroundColor Red
}
else {
    Write-Host "Found $($allFiles.Count) files:" -ForegroundColor Green
    Write-Host ""
    
    foreach ($file in $allFiles) {
        try {
            $relativePath = Resolve-Path -Path $file.FullName -Relative -ErrorAction Stop
        }
        catch {
            $relativePath = $file.Name
        }
        Write-Host "===================================" -ForegroundColor DarkCyan
        Write-Host "File: $relativePath" -ForegroundColor Yellow
        Write-Host "Size: $($file.Length) bytes" -ForegroundColor Gray
        Write-Host "Last Modified: $($file.LastWriteTime)" -ForegroundColor Gray
        Write-Host "-----------------------------------" -ForegroundColor DarkCyan
        
        try {
            $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
            if ([string]::IsNullOrWhiteSpace($content)) {
                Write-Host "<empty file>" -ForegroundColor DarkGray
            }
            else {
                Write-Host $content
            }
        }
        catch {
            Write-Host "Error reading file: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        Write-Host ""
    }
}

# Create required files if they don't exist
if ($CreateIfMissing -and $RequiredFiles.Count -gt 0) {
    Write-Host "=== Checking Required Files ===" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($requiredFile in $RequiredFiles) {
        $fullPath = Join-Path -Path $Path -ChildPath $requiredFile
        
        if (-not (Test-Path -Path $fullPath)) {
            Write-Host "Creating missing file: $requiredFile" -ForegroundColor Yellow
            
            # Create directory if needed
            $directory = Split-Path -Path $fullPath -Parent
            if ($directory -and -not (Test-Path -Path $directory)) {
                New-Item -Path $directory -ItemType Directory -Force | Out-Null
            }
            
            # Create the file with template content based on extension
            $extension = [System.IO.Path]::GetExtension($requiredFile)
            $nl = [Environment]::NewLine
            $defaultContent = switch ($extension) {
                ".md" { "# $([System.IO.Path]::GetFileNameWithoutExtension($requiredFile))$nl${nl}Content goes here.$nl" }
                ".txt" { "Content goes here.$nl" }
                ".json" { "{$nl  `"description`": `"Auto-generated file`"$nl}$nl" }
                ".ps1" { "# PowerShell script: $requiredFile$nl${nl}Write-Host 'Script content goes here'$nl" }
                default { "# Auto-generated file: $requiredFile$nl" }
            }
            
            Set-Content -Path $fullPath -Value $defaultContent -Encoding UTF8
            Write-Host "Created: $requiredFile" -ForegroundColor Green
        }
        else {
            Write-Host "File exists: $requiredFile" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Cyan
