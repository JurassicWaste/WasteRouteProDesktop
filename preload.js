// Minimal preload script
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("wasteApp", {
  version: "1.0.0"
});
