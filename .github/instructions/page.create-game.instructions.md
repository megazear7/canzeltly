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

## Game Configuration Options

### Basic Settings

- **Game Name**: Text input for naming the game
- **World Dimensions**: Sliders for width and height (default 1000x1000)
- **Game Mode**: Dropdown selection (Survival, Adventure, Race)

### Enemy/Object Settings

- **Number of Circles**: Slider for various enemy types (Bouncy, Gravity, Hunter, Blockade, Void, Ghost)
- **Number of Green Circles**: Collectible circles for Adventure/Race modes
- **Time Limit**: For Race mode (seconds)

### Collectable Spawn Settings

- **Spawn Food Chance**: Percentage chance (0-100%) to spawn food collectables that restore health
- **Spawn Shield Chance**: Percentage chance (0-100%) to spawn shield collectables that provide temporary damage immunity
- **Spawn Ice Chance**: Percentage chance (0-100%) to spawn ice collectables that freeze enemies temporarily

### Player Settings

- **Health**: Starting health value
- **Custom Game Modes**: Save/load custom configurations

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
- Configure collectable spawn rates (e.g., Food: 20%, Shield: 10%, Ice: 5%)
- Click the Create Game button
- Wait for navigation
- Verify the URL redirects to the play page with the correct pattern

### Collectable Spawn Testing

- Create a game with specific spawn rates
- Start the game and observe collectable spawning
- Verify food restores health, shields provide immunity, ice freezes enemies
- Test edge cases (0% spawn rates, 100% spawn rates)

### Form Validation Test

- Navigate to the create game page
- Fill the form with invalid inputs
- Attempt to submit the form
- Verify validation messages appear

### Custom Mode Save/Load Test

- Configure a custom game mode with collectable settings
- Save the mode with a name
- Reload the page
- Load the saved mode
- Verify all settings including spawn rates are restored
