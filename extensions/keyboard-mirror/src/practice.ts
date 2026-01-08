import { open, environment } from "@raycast/api";
import { spawn, execSync } from "child_process";
import { chmodSync } from "fs";

export default async function Command() {
  // Use the bundled asset path. This is the "Raycast Way".
  // The app is inside the assets folder of the extension.
  const appPath = `${environment.assetsPath}/KeyboardMirror.app/Contents/MacOS/KeyboardMirror`;

  // Ensure executable (sometimes permissions are lost in transit)
  try {
    chmodSync(appPath, "755");
  } catch (e) {
    // ignore if fails, might already be exec
  }

  try {
    // Check if running. throws if not found
    execSync("pgrep -x KeyboardMirror");

    // If running, toggle via URL scheme
    await open("keyboard-mirror://toggle");
  } catch (e) {
    // Not running, spawn directly to inherit permissions from Raycast
    const child = spawn(appPath, [], {
      detached: true,
      stdio: "ignore",
      env: process.env,
    });
    child.unref();
    // await showHUD("Launched Keyboard Mirror");
  }
}
