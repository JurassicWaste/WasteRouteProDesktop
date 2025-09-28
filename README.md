# WasteRoute Pro — Minimal Desktop Wrapper

Loads https://exeterwasteremoval.co.uk inside an Electron window and packages a Windows installer.

## Build (Windows)

```powershell
# 1) Extract this folder to a short path, e.g. C:\WRPDesktop
cd C:\WRPDesktop

# 2) Install Node.js LTS first, then:
npm install

# 3) Build the installer
npm run dist

# Output: dist\WasteRoutePro-Setup-1.0.0.exe
```

If SmartScreen warns "Unknown publisher", click **More info → Run anyway** (normal for unsigned tests).

To change the site later, edit APP_URL in main.js and rebuild.
