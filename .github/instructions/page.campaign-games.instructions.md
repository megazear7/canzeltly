---
applyTo: "src/client/page.campaign-games.ts"
---

# Instructions for the Campaign Games Page

The campaign games page displays the games in a specific campaign instance, showing hero stats, progress, and allowing players to start the next available game. It handles campaign completion and provides visual feedback for completed, next, and locked games.

## Key Features

- Displays campaign title and description
- Shows hero stats (health, max speed, acceleration)
- Lists all games with completion status
- Highlights next available game
- Handles campaign completion state
- Generates unique game IDs for campaign play
- Error handling for invalid campaign instances

## Route Parameters

- `instanceId`: The campaign instance ID

## Testing with Playwright MCP

### Valid Campaign Display Test

- Navigate to a campaign games page with a valid instance ID
- Take a snapshot of the page
- Verify the campaign title is displayed
- Check that the hero stats section is present
- Count the number of games displayed in the campaign

### Hero Stats Display Test

- Navigate to a campaign games page
- Verify hero stats values are displayed (Health, Max Speed, Acceleration)
- Check that all three stats are shown with correct labels

### Game List and Status Test

- Navigate to a campaign games page
- Test game item classes and content
- Verify completed games show check icons
- Verify next game shows play button
- Verify locked games are visually distinguished
- Check that only one game has 'next' class and play button

### Play Game Navigation Test

- Navigate to a campaign games page
- Click the Play button on the next available game
- Verify navigation to the play page with correct parameters

### Game Item Styling Test

- Navigate to a campaign games page
- Test different game item states (completed, next, locked)
- Verify completed items have normal opacity
- Verify locked items have reduced opacity
- Check visual styling differences between game states

### Campaign Completion Test

- Navigate to a completed campaign
- Verify campaign completion message is displayed
- Check that no play buttons are available

### Invalid Campaign Test

- Navigate to a campaign games page with an invalid instance ID
- Verify error message is displayed
- Check that the Home button is present for navigation back
