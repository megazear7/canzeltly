---
applyTo: "src/client/page.saved-games.ts"
---

# Instructions for the Saved Games Page

The saved games page displays a list of all saved games using the `canzeltly-games-list` component. It extends the games provider to manage game data and provides navigation back to home.

## Key Features
- Displays list of saved games with management options
- Back button navigation to home page
- Uses games provider for data management
- Responsive layout with proper spacing

## Testing with Playwright MCP

### Page Load and Layout Test
- Navigate to the saved games page at http://localhost:3000/saved-games
- Take a snapshot of the page
- Verify the Home button is present
- Verify the games list component is rendered
- Check the page layout and styling

### Back Navigation Test
- Navigate to the saved games page
- Click the Home button
- Verify navigation to the home page

### Empty State Test
- Clear localStorage data
- Navigate to the saved games page
- Verify empty state message is displayed when no games exist

### Games List Interaction Test
- Navigate to the saved games page
- Take a snapshot of the page
- Count the number of saved game items displayed
- Test clicking on individual game items
- Verify game preview modal or navigation works correctly
- Test selecting multiple games if available
- Check if bulk delete button appears when multiple games are selected
