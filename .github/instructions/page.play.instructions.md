---
applyTo: "src/client/page.play.ts"
---

# Instructions for the Play Page

The play page is the core game interface that renders the actual game. It parses route parameters for game ID, player ID, and various game options, then passes them to the `canzeltly-play` component.

## Key Features
- Parses URL parameters: gameId, playerId, newgame flag, campaign slug, mode name
- Renders the play component with all necessary props
- Handles different game modes and campaign integration
- Minimal page logic, delegates to the play component

## Route Parameters
- `gameId`: Unique identifier for the game instance
- `playerId`: Unique identifier for the player
- `newgame`: Boolean flag indicating if this is a newly created game
- `campaign`: Campaign instance slug for campaign games
- `mode`: Game mode name for custom modes

## Testing with Playwright MCP

### Basic Game Load Test
- Navigate to a play page with test game and player IDs
- Take a snapshot of the page
- Verify the play component is rendered
- Check that the component has correct props (gameId, playerId, isNewGame, etc.)

### Game Rendering Test
- Navigate to a play page
- Wait for the game to load
- Verify the game canvas is present
- Check that HUD elements are displayed

### Campaign Game Test
- Navigate to a campaign game URL
- Verify campaign parameter is passed correctly
- Check that campaign-specific features are enabled

### Custom Mode Test
- Navigate to a play page with a custom game mode parameter
- Verify mode parameter is passed correctly
- Check that custom mode features are applied

### Game Controls Test
- Navigate to a play page
- Wait for the game to load
- Test keyboard input and controls
- Send arrow key presses
- Check for game state changes and FPS display

### Game Completion Test
- Navigate to a play page
- Wait for potential game completion
- Check if redirected to summary page or game over modal appears
