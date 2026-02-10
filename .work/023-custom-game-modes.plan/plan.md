## Step 1: Update Create Game Page
- Add a "Save Custom Game Mode" button that saves the current selections as a custom game mode.
- Implement override logic with a confirmation modal: "A custom game mode with this name already exists, do you want to override it?"

## Step 2: Add Custom Game Modes Page
- Add a link on the home page called "Custom Game Modes".
- Create a new page that lists all custom game modes.

## Step 3: Custom Game Modes Page Functionality
- Allow defining custom configurations and playing games with those configurations.
- Clicking the play button for a mode takes you to the create game page with configurations preselected but editable.
- Reuse existing components to look similar to the saved games page.
- Refactor code to ensure reusable components are created and used as needed.
- Add option to select one or more custom game modes and delete them, with a select all option.