@echo off
copy "C:\Users\grace\.gemini\antigravity\brain\3bbcd55f-e5ef-4860-a1a1-f39fa5487e34\media__1773062135482.jpg" "c:\Users\grace\grace-isitua\public\grace-portrait.jpg" /Y
if exist "c:\Users\grace\grace-isitua\public\grace-portrait.jpg" (
    echo Success
) else (
    echo Failure
)
