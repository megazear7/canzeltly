# Detailed Work Plan: Add Achievement Badges

## Overview
Implement a badge system to reward players for various achievements, including campaign victories, game play milestones, survival time, object collection, and badge collection itself. Include a progress bar showing completion percentage. Badge data will be loaded as part of the app context on the home page.

## Step 1: Define Badge and Achievement Types
- Create `src/shared/type.badge.ts` with Zod schemas for badge definitions and criteria
- Define badge categories: campaign victories, game plays (10/100/1000), survival time (1/10/100/1000 min), green circle collection (10/100/1000), badge collection (10/100/1000)
- Create `src/shared/type.achievement.ts` for tracking unlocked badges and progress

## Step 2: Add Achievements to App Context
- Update `src/client/context.ts` to include achievements in AppContext
- Modify `src/client/provider.app.ts` to load achievements from storage
- Ensure achievements are available globally via app context

## Step 3: Update Storage for Achievements
- Add achievement storage key to `src/client/util.storage.ts`
- Implement save/load functions for achievements
- Ensure achievements persist across sessions

## Step 4: Implement Badge Checking Logic
- Create utility functions in `src/shared/util.achievements.ts` to check badge criteria
- Integrate badge checks into game over logic for campaigns and survival time
- Add collection tracking for green circles and badges
- Track total games played

## Step 5: Create Badge Unlock Events
- Create `src/client/event.badge-unlocked.ts` for badge unlock notifications
- Update `src/client/util.events.ts` to include the new event
- Dispatch events when badges are earned

## Step 6: Create Badge Display Components
- Create `src/client/component.badge.ts` for individual badge display
- Create `src/client/component.badge-progress.ts` for the progress bar
- Create `src/client/component.badges-list.ts` for displaying all badges

## Step 7: Create Achievements Page
- Create `src/client/page.achievements.ts` extending `CanzeltlyAppProvider`
- Display all badges with earned status
- Show progress bar
- Add navigation link

## Step 8: Update Routing and Navigation
- Add achievements route to `src/shared/type.routes.ts`
- Update `src/client/app.routes.ts` with achievements route
- Update `src/client/app.ts` to render achievements page
- Add link to achievements page from home page

## Step 9: Integrate Badge Tracking into Game Logic
- Update campaign completion logic to check for campaign victory badge
- Add game play counter to track total games
- Integrate survival time tracking in survival mode
- Update collection logic to track green circles collected

## Step 10: Testing and Validation
- Test badge unlocking for each category
- Verify progress bar updates correctly
- Ensure achievements persist across sessions
- Test UI responsiveness and styling

## Files to Create/Modify
- New: `src/shared/type.badge.ts`
- New: `src/shared/type.achievement.ts`
- New: `src/shared/util.achievements.ts`
- New: `src/client/event.badge-unlocked.ts`
- New: `src/client/component.badge.ts`
- New: `src/client/component.badge-progress.ts`
- New: `src/client/component.badges-list.ts`
- New: `src/client/page.achievements.ts`
- Modify: `src/client/context.ts`
- Modify: `src/client/provider.app.ts`
- Modify: `src/client/util.storage.ts`
- Modify: `src/client/util.events.ts`
- Modify: `src/shared/type.routes.ts`
- Modify: `src/client/app.routes.ts`
- Modify: `src/client/app.ts`
- Modify: Game logic files (campaigns, collection, game over)

## Dependencies
- Follow existing patterns for types, providers, events, components, pages
- Use CSS variables from `static/app.css`
- Ensure TypeScript compilation and linting pass