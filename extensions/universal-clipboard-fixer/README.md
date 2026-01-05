# Universal Clipboard Fixer for Raycast

This is a local Raycast extension designed to fix Universal Clipboard (Handoff) issues between your Mac and other Apple devices.

## How it works

When you run the command "Fix Universal Clipboard", it executes a series of terminal commands that are known to resolve these issues:

1.  **Enables Clipboard Sharing** via `defaults write`.
2.  **Restarts pboard** (Pasteboard service).
3.  **Restarts useractivityd** (Handoff service).

## Installation

Since this is a custom local extension, you need to import it into Raycast manually:

1.  Open Raycast.
2.  Search for **"Import Extension"** and press Enter.
3.  Select the folder containing this project: `/Users/paolopuglielli/.gemini/antigravity/scratch/clipboard-fixer`
4.  The command **"Fix Universal Clipboard"** should now be available in Raycast.

## Usage

1.  Open Raycast.
2.  Type **"Fix Universal Clipboard"**.
3.  Press Enter.
4.  Wait for the success message.

## Troubleshooting

-   **Permissions**: If the command fails, Raycast might ask for permission to control your computer or run scripts. Please allow it.
