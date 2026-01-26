# -nnit-ai-enterprise
NNIT AI Enterprise - AI-Powered Freelancer Platform (100% Free)

## Quick Start - PowerShell File Reader

### One-Line Command to Read All Files

```powershell
Get-ChildItem -Path . -Recurse -File | Where-Object { $_.FullName -notmatch '[\\/]\.git[\\/]' } | ForEach-Object { Write-Host "=== $($_.Name) ===" -ForegroundColor Cyan; Get-Content $_.FullName; Write-Host "" }
```

### One-Line Command with Auto-Create Files

```powershell
$files = @("README.md", "LICENSE"); $files | ForEach-Object { if (-not (Test-Path $_)) { "Creating $_"; New-Item $_ -ItemType File -Value "# $_`n" } }; Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\.git' } | ForEach-Object { "=== $($_.Name) ==="; Get-Content $_; "" }
```

### Using the PowerShell Script

```powershell
# Simple usage - read all files
.\Read-AllFiles.ps1

# Advanced usage - read files and create missing ones
.\Read-AllFiles.ps1 -CreateIfMissing -RequiredFiles @("README.md", "LICENSE", "docs/guide.md")
```

For more details, see [POWERSHELL-GUIDE.md](POWERSHELL-GUIDE.md)
