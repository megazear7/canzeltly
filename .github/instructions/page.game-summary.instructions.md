---
applyTo: "src/client/page.game-summary.ts"
---

# Instructions for the Game Summary Page

The game summary page displays statistics and results for a completed game. It loads game state from storage and shows metrics like object count, duration, world size, and victory status.

## Key Features

- Parses route parameters for gameId and playerId
- Loads game state from local storage
- Displays game statistics in a grid layout
- Shows different content for completed vs. ongoing games
- Provides navigation back to home and option to continue unfinished games
- Handles case when game is not found

## Route Parameters

- `gameId`: ID of the game to summarize
- `playerId`: ID of the player viewing the summary

## Testing with Playwright MCP

### Valid Game Summary Test

- Navigate to a game summary page with valid game and player IDs
- Take a snapshot of the page
- Verify the page heading is displayed
- Check that game statistics are shown
- Verify specific stats like objects count are displayed

### Game Not Found Test

- Navigate to a summary page for a non-existent game
- Verify error message "Game Not Found" is displayed
- Check that a home link is present

### Continue Game Link Test

- Navigate to a summary page for an unfinished game
- Check if a continue game link is present
- Verify the continue link has the correct URL format
- Test clicking the continue link navigates to the play page

### Statistics Display Test

- Navigate to a game summary page
- Verify statistics grid layout
- Check individual stat styling and appearance

### Victory Status Test

- Navigate to a summary page for a completed game
- Check that victory status is displayed
- Verify the result shows as determined (not "Unknown")
