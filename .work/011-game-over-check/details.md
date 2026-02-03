# Game Over Check - Detailed Work Plan

## Overview
Implement a comprehensive game over system that detects collisions between player objects and enemy objects, manages game state transitions, and provides game summary functionality.

## Requirements
- Game state management with status tracking (NotStarted, Playing, Paused, GameOver)
- Collision detection between game objects
- Game over affect that triggers on collision
- Player victory/loss tracking
- Game summary page with statistics
- Non-closeable game over modal
- Updated saved games page with game status filtering
- Game loop updates for status checking and timing

## Technical Analysis
Based on codebase review:

### Current Game State
- `GameState` in `src/game/game.ts` contains basic game properties
- `Game` class has a `paused` boolean that needs to be replaced with status enum
- Player objects in `src/shared/type.player.ts` need victory tracking

### Affect System
- Affects are processed in `src/game/game.object.ts` updateState method
- New affect categories need to be added to `AffectCategory` enum
- Collision detection utility needed for game over affect

### Component Structure
- Modal component in `src/client/component.modal.ts` needs closeable property
- Game loop in `src/client/component.play.ts` needs status checking
- Saved games page needs game status filtering

### Routing
- New route needed for game summary page: `/play/game/review/:gameId/player/:uuid`
- Existing routes in `src/client/app.routes.ts`

## Implementation Steps

### 1. Update Type Definitions
**Files:** `src/game/type.game.ts`, `src/shared/type.player.ts`, `src/game/game.affect.ts`, `src/game/type.object.ts`

- Add `GameStatus` enum with values: `NotStarted`, `Playing`, `Paused`, `GameOver`
- Add `Victory` enum with values: `Win`, `Lose`
- Update `GameState` to include:
  - `status: GameStatus`
  - `started?: number` (unix timestamp)
  - `ended?: number` (unix timestamp)
  - `duration?: number` (milliseconds)
- Update `Player` type to include `victory?: Victory`
- Add `GameOver` to `AffectCategory` enum
- Add `GameOverState` affect type with `playerId: PlayerId`

### 2. Create Collision Utility
**File:** `src/shared/util.collision.ts` (new file)

- Create `checkForCollision` function that checks if two circles collide
- Parameters: object1 (GameObjectState), object2 (GameObjectState)
- Return: boolean indicating collision

### 3. Implement Game Over Affect
**File:** `src/game/affect.game-over.ts` (new file)

- Create `gameOver` affect function
- Get `playerId` from affect state
- Iterate through all game objects
- Use `checkForCollision` utility to check collision between "this" object and others
- On collision:
  - Set game status to `GameOver`
  - Set game `ended` timestamp
  - Find player and set `victory` to `Lose`
- Register affect in `src/game/game.object.ts`

### 4. Update Game Class
**File:** `src/game/game.ts`

- Replace `paused: boolean` with status-based logic
- Update `update()` method to check game status
- Add methods for status transitions
- Update `pause()` and `resume()` methods to use status enum

### 5. Create Player Circle
**File:** `src/game/object.circle.ts`

- Add `heroCircle` function that creates a special circle for players
- Include game over affect
- Update `src/game/util.new-game.ts` to use `heroCircle` for players
- Update `src/client/component.create-game.ts` to use `heroCircle`

### 6. Update Modal Component
**File:** `src/client/component.modal.ts`

- Add `closeable` property (default: true)
- Conditionally render close button and handle backdrop clicks
- Prevent escape key closing when not closeable

### 7. Create Game Summary Page
**File:** `src/client/page.game-summary.ts` (new file)

- Create new page component for `/play/game/review/:gameId/player/:uuid`
- Display game statistics:
  - Object count
  - Game duration
  - World size
  - Player victory status
- Include "Back to Home" button
- Include "Continue Game" button (if game not over)

### 8. Update Game Loop
**File:** `src/client/component.play.ts`

- Set `started` timestamp on first loop iteration
- Update `duration` calculation on each frame
- Check game status on each loop
- On game over:
  - Stop animation loop
  - Set `ended` timestamp
  - Open non-closeable game over modal

### 9. Create Game Over Modal
**File:** `src/client/component.game-over-modal.ts` (new file)

- Create modal component for game over state
- Display win/lose information
- Include "End Game" button linking to summary page
- Set as non-closeable

### 10. Update Saved Games Page
**File:** `src/client/component.games-list.ts`

- Separate games into two lists: active and completed
- Update play buttons for completed games to "View Summary"
- Update modal play buttons accordingly

### 11. Update Routing
**File:** `src/client/app.routes.ts`

- Add route for game summary page
- Update app.ts render method to handle new route

## Files to Create
- `src/shared/util.collision.ts`
- `src/game/affect.game-over.ts`
- `src/client/page.game-summary.ts`
- `src/client/component.game-over-modal.ts`

## Files to Modify
- `src/game/type.game.ts` - Add GameStatus enum and GameState properties
- `src/shared/type.player.ts` - Add Victory enum and player victory property
- `src/game/game.affect.ts` - Add GameOver to AffectCategory
- `src/game/type.object.ts` - Add GameOverState affect type
- `src/game/game.ts` - Replace paused boolean with status enum
- `src/game/object.circle.ts` - Add heroCircle function
- `src/game/util.new-game.ts` - Use heroCircle for players
- `src/client/component.create-game.ts` - Use heroCircle
- `src/client/component.modal.ts` - Add closeable property
- `src/client/component.play.ts` - Update game loop with status checking
- `src/client/component.games-list.ts` - Separate active/completed games
- `src/client/app.routes.ts` - Add summary page route
- `src/client/app.ts` - Handle new route

## Testing
- Test collision detection between player and enemy objects
- Test game over modal appears on collision
- Test game status transitions
- Test game summary page displays correct statistics
- Test saved games page shows separate lists
- Test modal closeable/non-closeable behavior
- Test game timing and duration calculation

## Potential Edge Cases
- Multiple players in same game
- Game over triggered by multiple collisions
- Game paused during collision
- Player objects without game over affect
- Invalid game states or missing timestamps
- Browser refresh during game over modal