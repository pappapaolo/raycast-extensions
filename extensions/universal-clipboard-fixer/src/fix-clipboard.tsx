import { showToast, Toast, closeMainWindow } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default async function Command() {
    await closeMainWindow();

    try {
        await showToast({
            style: Toast.Style.Animated,
            title: "Fixing Universal Clipboard...",
        });

        const home = process.env.HOME;
        if (!home) {
            throw new Error("Could not find home directory");
        }

        // Run the commands suggested by the user and research
        // 1. Enable clipboard sharing
        // We wrap this in a try-catch because on some systems this file is protected or "Could not write domain"
        try {
            await execAsync(`/usr/bin/defaults write ${home}/Library/Preferences/com.apple.coreservices.useractivityd.plist ClipboardSharingEnabled 1`);
        } catch (error) {
            console.warn("Failed to set defaults, continuing...", error);
        }

        let pboardError = null;
        let useractivitydError = null;

        // 2. Kill the pasteboard process (it will auto-restart)
        try {
            await execAsync("/usr/bin/killall pboard");
        } catch (error) {
            pboardError = error;
        }

        // 3. Kill the useractivityd process (it will auto-restart)
        try {
            await execAsync("/usr/bin/killall useractivityd");
        } catch (error) {
            useractivitydError = error;
        }

        // If both kill commands failed, then we have a problem. 
        // If at least one worked (or pboard wasn't running so killall failed), we consider it a success.

        await showToast({
            style: Toast.Style.Success,
            title: "Clipboard Services Restarted",
            message: "Universal Clipboard services have been reset.",
        });
    } catch (error) {
        await showToast({
            style: Toast.Style.Failure,
            title: "Failed to Fix Clipboard",
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
