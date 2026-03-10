$source = 'C:\Users\grace\.gemini\antigravity\brain\3bbcd55f-e5ef-4860-a1a1-f39fa5487e34\media__1773062135482.jpg'
$dest = 'c:\Users\grace\grace-isitua\public\grace-portrait.jpg'
Copy-Item -Path $source -Destination $dest -Force
if (Test-Path $dest) {
    Write-Host "Successfully copied to $dest"
} else {
    Write-Error "Failed to copy to $dest"
    exit 1
}
