---
applyTo: "src/client/page.start-campaign.ts"
---

# Instructions for the Start Campaign Page

The start campaign page allows users to begin new campaign adventures. It displays available campaigns with descriptions and provides options to start them, creating campaign instances with initial hero stats.

## Key Features

- Lists all available campaigns with details
- Creates new campaign instances with unique IDs
- Initializes hero stats and progress tracking
- Provides navigation to continue existing campaigns
- Back button to return to home

## Key Functionality

- Campaign selection and instance creation
- Hero stats initialization
- Progress tracking setup
- Navigation between campaign pages

## Testing with Playwright MCP

### Page Load and Campaign Display Test

- Navigate to the start campaign page at http://localhost:3000/campaigns/start
- Take a snapshot of the page
- Verify the page heading is displayed
- Check that the Home button is present
- Count the number of campaign cards displayed
- Verify the continue campaign link is present

### Campaign Selection and Start Test

- Navigate to the start campaign page
- Get details of the first campaign card (title, description, games count)
- Verify the Begin Campaign button is present
- Click the Begin Campaign button
- Wait for navigation
- Verify the URL matches the campaign instance pattern

### Preselected Campaign Test

- Navigate to the start campaign page with a preselected campaign parameter
- Verify the correct campaign is highlighted or pre-selected
- Test starting the preselected campaign

### Navigation Tests

- Navigate to the start campaign page
- Test the Home button navigation
- Test the continue campaign link navigation

### Campaign Card Layout Test

- Navigate to the start campaign page
- Test campaign card styling and layout
- Verify campaign actions layout and spacing
