---
name: testing
description: Guidelines for testing using Playwright and Chrome DevTools
---

 - Use the Playwright MCP server for end-to-end testing.
 - Use the Chrome DevTools for debugging client-side code during testing, checking local storage, and other browser-specific testing.
 - Use mcp_playwright_browser_navigate to go to pages, mcp_playwright_browser_click to interact with elements, and mcp_playwright_browser_snapshot to capture page state.
 - Check console messages with mcp_playwright_browser_console_messages for errors during interactions.
 - Verify UI changes by comparing snapshots before and after actions.
