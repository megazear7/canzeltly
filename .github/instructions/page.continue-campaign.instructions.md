---
applyTo: "src/client/page.continue-campaign.ts"
---

# Instructions for the Continue Campaign Page

The continue campaign page displays active campaign instances with progress tracking. Users can resume campaigns, view completion status, and delete campaign instances they no longer want.

## Key Features
- Lists all active campaign instances
- Shows progress for each campaign (completed/total games)
- Allows resuming campaigns by clicking on them
- Provides delete functionality with confirmation modal
- Handles empty state when no active campaigns exist
- Navigation to start new campaigns

## Key Functionality
- Campaign instance management
- Progress display and calculation
- Delete confirmation workflow
- Modal-based interactions

## Testing with Playwright MCP

### Page Load and Active Campaigns Test
- Navigate to the continue campaign page at http://localhost:3000/campaigns/continue
- Take a snapshot of the page
- Verify the page heading is displayed
- Check that the Home button is present
- Count the number of active campaign cards displayed

### Empty State Test
- Clear campaign data from localStorage
- Navigate to the continue campaign page
- Verify empty state message is displayed
- Check that the Start New Campaign button is present

### Campaign Progress Display Test
- Navigate to the continue campaign page
- Test campaign card content display (title, description, progress)
- Verify progress format shows completed vs total games
- Check campaign card styling and layout

### Campaign Resume Test
- Navigate to the continue campaign page
- Click on a campaign card to resume
- Verify navigation to the campaign games page

### Delete Campaign Test
- Navigate to the continue campaign page
- Test the kebab menu button for deleting campaigns
- Click the delete menu button
- Verify delete confirmation modal appears
- Test the cancel button to close the modal
- Test the delete button to confirm campaign deletion

### Navigation Tests
- Navigate to the continue campaign page
- Test the Home button navigation
- Test the Start New Campaign button navigation when no campaigns exist
