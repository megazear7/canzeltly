---
applyTo: "src/client/page.achievements.ts"
---

# Instructions for the Achievements Page

The achievements page displays the user's unlocked badges and progress towards completing all achievements. It shows individual badges with their status and a progress bar indicating overall completion.

## Key Features

- Displays all available badges with earned/unearned status
- Shows progress bar with total badges collected
- Lists badge details including name, description, and progress
- Accessible from the home page navigation

## Badge Categories

- Campaign Victories: Awarded for defeating campaigns
- Games Played: Milestones for total games completed (10, 100, 1000)
- Survival Time: Time-based achievements in survival mode (1, 10, 100, 1000 minutes)
- Green Circles Collected: Collection achievements (10, 100, 1000)
- Badges Collected: Meta-achievement for collecting other badges

## Testing with Playwright MCP

Use the following test steps to verify the achievements page functionality:

### Basic Page Load Test

- Navigate to the achievements page at http://localhost:3000/achievements
- Take a snapshot of the page
- Verify the page title "Achievements" is displayed
- Verify the progress bar is present
- Verify badge list is displayed

### Initial State Test

- Navigate to the achievements page
- Verify progress bar shows 0/total badges
- Verify all badges are shown as unearned (grayed out or with 0 progress)
- Check that badge names and descriptions are displayed

### Badge Unlock Test

- Play games to unlock badges (see specific test scenarios below)
- Navigate to achievements page after each unlock
- Verify progress bar updates correctly
- Verify unlocked badges show earned status
- Verify toast notifications appear for new unlocks

### Progress Bar Test

- Navigate to achievements page
- Verify progress bar shows current/total format
- Verify progress fill width corresponds to percentage
- Test with different numbers of unlocked badges

### Badge Details Test

- Navigate to achievements page
- For each badge, verify:
  - Icon is displayed
  - Name is correct
  - Description is accurate
  - Progress text shows current/threshold
  - Unlocked badges have different styling

## Specific Badge Unlock Scenarios

### Campaign Victory Badge

- Start a new campaign from home page
- Complete all games in the campaign
- Navigate to achievements page
- Verify "Campaign Conqueror" badge is unlocked

### Games Played Badges

- Play 10 quick start games
- Navigate to achievements page
- Verify "Getting Started" badge is unlocked
- Continue to 100 and 1000 games for higher tiers

### Survival Time Badges

- Create a survival mode game
- Play until reaching time thresholds (1, 10, 100, 1000 minutes)
- Navigate to achievements page
- Verify corresponding survival badges are unlocked

### Green Circles Collection Badges

- Play adventure or race mode games
- Collect green circles to reach thresholds (10, 100, 1000)
- Navigate to achievements page
- Verify collection badges are unlocked

### Badges Collected Meta-Achievement

- Unlock other badges to reach collection thresholds
- Navigate to achievements page
- Verify meta-badges are unlocked

## Responsive Design Test

- Navigate to achievements page
- Set viewport to mobile size (375x667)
- Take a snapshot of the page
- Verify badges are displayed in a single column
- Set viewport to desktop size (1200x800)
- Take a snapshot of the page
- Verify badges are displayed in a grid layout</content>
  <parameter name="filePath">/Users/alexlockhart/src/canzeltly/.github/instructions/page.achievements.instructions.md
