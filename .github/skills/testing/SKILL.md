---
name: testing
description: Guidelines for testing using Playwright and Chrome DevTools
---

## Overview
Use Playwright MCP for end-to-end testing and Chrome DevTools for debugging. Follow page-specific test instructions in `.github/instructions/page.<page-name>.instructions.md` files for detailed testing procedures.

## General Testing Workflow
- Start by navigating to the application URL
- Follow the test instructions for each page in the corresponding instruction file
- Use snapshots to verify UI state before and after interactions
- Check console messages for errors during testing
- Validate local storage changes when applicable

## Page-Specific Testing Instructions
Refer to these instruction files for detailed test procedures for each page:
- `page.home.instructions.md` - Home page navigation and initial setup
- `page.create-game.instructions.md` - Game creation workflow
- `page.saved-games.instructions.md` - Saved games management
- `page.custom-game-modes.instructions.md` - Custom game modes handling
- `page.play.instructions.md` - Game playing interface
- `page.game-summary.instructions.md` - Post-game summary display
- `page.campaign-games.instructions.md` - Campaign games listing
- `page.start-campaign.instructions.md` - Campaign initialization
- `page.continue-campaign.instructions.md` - Campaign continuation
- `page.campaign-upgrade.instructions.md` - Campaign progression
- `page.not-found.instructions.md` - Error page handling

## Testing Tools and Commands
- Use `mcp_playwright_browser_navigate` to navigate to different pages
- Use `mcp_playwright_browser_click` to interact with buttons and links
- Use `mcp_playwright_browser_snapshot` to capture page state for verification
- Use `mcp_playwright_browser_console_messages` to check for JavaScript errors
- Use `mcp_playwright_browser_tabs` to manage browser tabs during testing
- Use `mcp_chrome-devtoo_emulate` to test different device configurations

## Common Test Patterns
- **Navigation Testing**: Verify that clicking navigation elements takes you to the correct page
- **Form Testing**: Fill out forms and verify submission works correctly
- **Modal Testing**: Test modal opening, interaction, and closing
- **Game State Testing**: Verify game objects appear and behave correctly
- **Local Storage Testing**: Check that data persists between sessions
- **Error Handling**: Test invalid inputs and error states

## Validation Steps
- Always take snapshots before and after major interactions
- Check that expected elements are present on the page
- Verify that buttons and links have the correct text labels
- Ensure console is free of errors during normal operation
- Test both success and failure scenarios

## Debugging During Testing
- Use Chrome DevTools to inspect elements and check local storage
- Monitor network requests with `mcp_playwright_browser_network_requests`
- Check console messages for warnings and errors
- Use browser evaluation with `mcp_playwright_browser_evaluate` for complex checks

## Test Data Management
- Create test games and campaigns for consistent testing
- Use local storage to maintain test state between sessions
- Clean up test data when necessary to avoid interference

## Autonomous Testing Guidelines
- Follow the bullet-point instructions in each page's instruction file exactly
- Use exact button and link text labels as specified in the instructions
- Take snapshots at key points to verify expected state changes
- Report any deviations from expected behavior
- Test edge cases and error conditions when possible
