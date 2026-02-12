---
applyTo: "src/client/page.create-game.ts"
---

# Instructions for the Create Game Page

The create game page provides a form interface for users to create new games. It uses the `canzeltly-create-game` component to handle game creation logic and navigates to the play page upon successful creation.

## Key Features
- Displays a back button to return to home
- Embeds the create-game component for game configuration
- Handles game creation events and redirects to play page
- Generates new game URLs with proper parameters

## Testing with Playwright MCP

### Page Load and Navigation Test
- Navigate to the create game page at http://localhost:3000/create-game
- Take a snapshot of the page
- Verify the Home button is present
- Verify the create-game component is rendered

### Back Button Navigation Test
- Navigate to the create game page
- Click the Home button
- Verify navigation to the home page

### Game Creation Flow Test
- Navigate to the create game page
- Take a snapshot of the page
- Fill out the game creation form with test values (Game Name, World Width, World Height, Number of Circles)
- Click the Create Game button
- Wait for navigation
- Verify the URL redirects to the play page with the correct pattern

### Form Validation Test
- Navigate to the create game page
- Fill the form with invalid inputs
- Attempt to submit the form
- Verify validation messages appear
