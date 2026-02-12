---
name: using-chrome-devtools
description: Guidelines for using Chrome DevTools for debugging and testing the Canzeltly application
---

# Using Chrome DevTools for Debugging and Testing

Chrome DevTools is essential for debugging client-side code, inspecting UI, checking console errors, and testing functionality in the Canzeltly application. Use the chrome-devtools MCP server tools for automated assistance with browser-based debugging.

## Assume the Development Server is Running

You should assume that I am already running the development server.
If think the server is not running, stop and ask me to start it.
The server is running on `http://localhost:3000`.

## Opening URLs in the Browser

Use the browser to navigate to key application paths for testing:

- **Home Page**: `http://localhost:3000/` - The main landing page.
- **Create Game**: `http://localhost:3000/create-game` - Page for creating new games.
- **Play Game**: `http://localhost:3000/play/game/quickstart-testing/player/0c61f613-b5cd-4745-b0a3-a2595dace014` - Example game URL for testing gameplay.
- **Saved Games**: `http://localhost:3000/saved-games` - View and manage saved games.

Open these URLs in Chrome to access the application.

## Using Chrome DevTools

Use the chrome-devtools MCP server tools to automate browser interactions, inspect the application, and debug issues. The server provides programmatic access to Chrome DevTools functionality.

### Key Tools for Debugging

- **take_snapshot**: Capture the accessibility tree of the page to inspect UI elements. Use this to identify elements by their unique `uid` for further actions. Prefer this over screenshots for element selection.
- **evaluate_script**: Run JavaScript code in the page context to inspect or modify the application state. For example, execute `() => { return document.title; }` to get the page title, or interact with the game's internal state.

- **list_console_messages**: Retrieve console logs, errors, and warnings from the browser. Filter by type (e.g., 'error', 'warn') to focus on issues. Use this to check for JavaScript errors during gameplay or page loads.

- **take_screenshot**: Capture visual screenshots of the page or specific elements. Use `fullPage=true` for complete page views, or specify a `uid` for element-focused captures. Useful for verifying UI rendering or capturing bug states.

- **performance_start_trace** and **performance_stop_trace**: Record performance traces to analyze load times, Core Web Vitals (CWV), and insights. Start a trace before navigating to a page, then stop and review for bottlenecks in game loading or rendering.

- **list_network_requests**: Inspect network activity, such as API calls for game data or asset loading. Filter by resource type (e.g., 'script', 'image') to debug loading issues.

- **navigate_page**: Programmatically navigate to application URLs. Use this to test routing, e.g., navigate to `http://localhost:3000/play/game/quickstart-testing/player/0c61f613-b5cd-4745-b0a3-a2595dace014` and observe behavior.

- **click**, **fill**, **press_key**: Interact with the UI to simulate user actions, such as creating a game, playing moves, or submitting forms. Combine with snapshots to select elements accurately.

### Debugging Workflow

1. **Inspect Page Structure**: Start by taking a snapshot of the page to understand the DOM and identify key elements (e.g., game canvas, buttons).

2. **Check for Errors**: List console messages to catch JavaScript errors or warnings that might affect gameplay.

3. **Test Interactions**: Use click, fill, or press_key to simulate user inputs, then verify with screenshots or script evaluations.

4. **Analyze Performance**: Run performance traces on key pages (e.g., game creation or playback) to identify slow-loading assets or inefficient code.

5. **Monitor Network**: List network requests during page loads or game actions to ensure assets and data are loading correctly.

6. **Debug Specific Issues**: For visual bugs, take screenshots; for logic issues, evaluate scripts to inspect variables or call functions.

### Configuration Tips

- Ensure the MCP server is configured in your client (e.g., VS Code) with `"chrome-devtools": { "command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"] }`.
- Use `--headless=false` if you need to see the browser UI manually.
- For detailed logs, enable debugging with `DEBUG=*` and `--log-file`.
- If connecting to an existing browser, use `--browser-url=http://127.0.0.1:9222` after starting Chrome with remote debugging.

### Best Practices

- Always take a snapshot before interacting with elements to get current `uid`s.
- Use `includeSnapshot=true` in interaction tools to update the snapshot automatically.
- Check console messages after actions to catch new errors.
- Save performance traces or screenshots to files for review.
- Test on multiple pages: home, create-game, play, saved-games.

For tool-specific parameters and examples, refer to the [Chrome DevTools MCP Tool Reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md).
