---
applyTo: "src/client/page.home.ts"
---

# Instructions for the Home Page

The home page is the main landing page of the Canzeltly application. It displays the logo, title, and navigation links to various features including Quick Start, Create Game, Saved Games, Custom Game Modes, and Campaign options.

## Key Features

- Displays the Canzeltly logo and title
- Provides quick access links to all major application features
- Generates random game IDs for Quick Start functionality
- Uses standard anchor tags for navigation (SPA routing handled automatically)

## Testing with Playwright MCP

Use the following test steps to verify the home page functionality:

### Basic Page Load Test

- Navigate to the home page at http://localhost:3000/
- Take a snapshot of the page
- Verify the Canzeltly logo image is present
- Verify the page title is displayed correctly

### Navigation Links Test

- Navigate to the home page
- Take a snapshot of the page
- Verify all navigation links are present with correct text and href attributes

### Quick Start Link Test

- Navigate to the home page
- Get the href attribute of the Quick Start link
- Navigate to the home page again
- Get the href attribute of the Quick Start link again
- Verify that the URLs are different due to random generation

### Responsive Design Test

- Navigate to the home page
- Set viewport to mobile size (375x667)
- Take a snapshot of the page
- Set viewport to desktop size (1200x800)
- Take a snapshot of the page
