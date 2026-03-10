import shutil
import os

source = r"C:\Users\grace\.gemini\antigravity\brain\976224f1-f9df-41b8-be50-ff35a8d02d76\media__1773059709426.jpg"
dest = r"c:\Users\grace\grace-isitua\public\grace-portrait.jpg"

try:
    if os.path.exists(source):
        print(f"File exists at source. Size: {os.path.getsize(source)}")
        shutil.copy2(source, dest)
        print(f"Successfully copied to {dest}")
    else:
        print(f"Source file not found: {source}")
except Exception as e:
    print(f"Error copying: {e}")
