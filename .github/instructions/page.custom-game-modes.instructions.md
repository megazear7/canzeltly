---
applyTo: "src/client/page.custom-game-modes.ts"
---

# Instructions for the Custom Game Modes Page

The custom game modes page allows users to manage custom game modes using the `canzeltly-custom-game-modes-list` component. It extends the custom game modes provider and provides navigation back to home.

## Key Features

- Lists available custom game modes
- Allows creation, editing, and deletion of custom modes
- Back button navigation to home
- Uses custom game modes provider for data management
- Responsive layout with proper spacing

## Testing with Playwright MCP

### Page Load Test

- Navigate to the custom game modes page at http://localhost:3000/custom-game-modes
- Take a snapshot of the page
- Verify the Home button is present
- Verify the custom game modes list component is rendered

### Navigation Test

- Navigate to the custom game modes page
- Click the Home button
- Verify navigation to the home page

### Modes List Display Test

- Navigate to the custom game modes page
- Count the number of custom modes displayed
- Check if the page shows default modes or empty state
- Verify the page has content

### Create New Mode Test

- Navigate to the custom game modes page
- Look for a create or add mode button
- Click the create mode button if present
- Check if a modal or form appears for creating new modes

### Mode Management Test

- Navigate to the custom game modes page
- Test edit functionality if available
- Test delete functionality if available
