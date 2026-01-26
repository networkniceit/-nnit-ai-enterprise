# PowerShell File Reader

This repository includes a PowerShell script to read and display all files.

## One-Line PowerShell Command

To read all files in the current directory and subdirectories:

```powershell
Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -notmatch '[\\/]\.git[\\/]' } | ForEach-Object { Write-Host "=== $($_.Name) ===" -ForegroundColor Cyan; Get-Content $_.FullName; Write-Host "" }
```

## Using the Read-AllFiles.ps1 Script

### Basic Usage

```powershell
.\Read-AllFiles.ps1
```

### Advanced Usage

Read all files and automatically create missing required files:

```powershell
.\Read-AllFiles.ps1 -CreateIfMissing -RequiredFiles @("README.md", "LICENSE", "docs/guide.md")
```

### Parameters

- `-Path`: Specify the directory to scan (default: current directory)
- `-CreateIfMissing`: Enable automatic file creation
- `-RequiredFiles`: Array of files that should exist (will be created if missing)

### Examples

1. **Read all files in current directory:**
   ```powershell
   .\Read-AllFiles.ps1
   ```

2. **Read files and create missing documentation:**
   ```powershell
   .\Read-AllFiles.ps1 -CreateIfMissing -RequiredFiles @("README.md", "CONTRIBUTING.md", "docs/api.md")
   ```

3. **Read files in a specific path:**
   ```powershell
   .\Read-AllFiles.ps1 -Path "C:\Projects\MyApp"
   ```

## Quick Commands

### Copy-Paste One-Liner (Simple)

```powershell
Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\.git' } | ForEach-Object { "=== $($_.Name) ==="; Get-Content $_; "" }
```

### Copy-Paste One-Liner (With Auto-Create)

```powershell
$files = @("README.md", "LICENSE"); $files | ForEach-Object { if (-not (Test-Path $_)) { "Creating $_"; New-Item $_ -ItemType File -Value "# $_`n" } }; Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\.git' } | ForEach-Object { "=== $($_.Name) ==="; Get-Content $_; "" }
```

## Features

- ✅ Reads and displays all files in the repository
- ✅ Automatically excludes .git directory
- ✅ Shows file metadata (size, last modified date)
- ✅ Can automatically create missing files with template content
- ✅ Supports multiple file patterns
- ✅ Color-coded output for better readability

## Requirements

- PowerShell 5.1 or later (Windows)
- PowerShell Core 7+ (Cross-platform)

## Notes

The script automatically creates files with appropriate templates based on file extension:
- `.md` files: Markdown template with heading
- `.json` files: Valid JSON structure
- `.ps1` files: PowerShell script template
- `.txt` files: Plain text template
