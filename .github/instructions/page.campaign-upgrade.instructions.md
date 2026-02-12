---
applyTo: "src/client/page.campaign-upgrade.ts"
---

# Instructions for the Campaign Upgrade Page

The campaign upgrade page allows players to enhance their hero stats after completing campaign games. It displays available upgrade options, current stats, and handles the selection and application of upgrades before returning to the campaign.

## Key Features
- Displays current hero stats (health, max speed, acceleration, break speed)
- Shows available upgrade options with descriptions
- Allows selection of multiple upgrades (based on game configuration)
- Validates selection limits and provides feedback
- Applies upgrades to campaign instance and saves progress
- Handles cases with no upgrades available

## Route Parameters
- `instanceId`: The campaign instance ID

## Key Functionality
- Upgrade selection with toggle behavior
- Stat application and persistence
- Navigation back to campaign games
- Selection limit enforcement

## Testing with Playwright MCP

### Upgrade Page Load Test
- Navigate to the upgrade page for a campaign instance
- Take a snapshot of the page
- Verify the page title is displayed
- Check that the current stats section is present
- Count the number of upgrade options available

### Current Stats Display Test
- Navigate to the upgrade page
- Verify all four hero stats are displayed (Health, Max Speed, Acceleration, Break Speed)
- Check that stat values and labels are correct

### Upgrade Selection Test
- Navigate to the upgrade page
- Test selecting an upgrade option
- Verify the selected class is applied to chosen options
- Test selecting multiple options if allowed
- Check selection counter updates

### Selection Limit Test
- Navigate to the upgrade page
- Get maximum selections allowed
- Try to select more than the allowed limit
- Verify selection limit is enforced

### Apply Upgrades Test
- Navigate to the upgrade page
- Select the required number of upgrades
- Verify the apply button becomes enabled
- Click the apply upgrades button
- Verify navigation back to the campaign games page

### No Upgrades Available Test
- Navigate to an upgrade page with no available upgrades
- Verify no upgrades message is displayed
- Check that a continue button is present

### Invalid Campaign Test
- Navigate to an upgrade page for a non-existent campaign
- Verify error handling displays appropriate message

### Upgrade Option Details Test
- Navigate to the upgrade page
- Verify each upgrade option shows name and description
- Check that all upgrade options have complete details
