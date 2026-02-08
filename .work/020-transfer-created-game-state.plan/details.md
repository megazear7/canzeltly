# Detailed Work Plan for Transfer Created Game State

## Overview
This plan addresses three main issues:
1. Prevent newly created games from appearing in the saved games list until explicitly saved.
2. Add "select all" functionality for active and completed games sections.
3. Fix the delete button that remains disabled even when games are selected.

## Step 1: Transfer Created Game State to Separate Storage

### Objective
Modify the game creation flow to store new games in a temporary "new-game" local storage key, and load them in the play page only when the `newgame=true` query parameter is present. This ensures created games don't appear in saved games until saved during play.

### Implementation Details

#### 1.1 Modify `util.storage.ts`
- Add a new storage key: `const NEW_GAME_KEY = "canzeltly_new_game";`
- Add functions to save/load/delete from new-game storage:
  - `saveNewGameState(gameState: GameState): void`
  - `loadNewGameState(): GameState | undefined`
  - `deleteNewGameState(): void`

#### 1.2 Modify `component.create-game.ts`
- In `handleSubmit()`, change `saveGameState(gameState)` to `saveNewGameState(gameState)`
- Ensure the game is saved to the new storage location.

#### 1.3 Modify `page.create-game.ts`
- In `handleGameCreated()`, modify the navigation URL to include `?newgame=true`:
  - `window.location.assign(`/play/game/${id}/player/${playerId}?newgame=true`);`

#### 1.4 Modify `page.play.ts`
- Parse the query parameters to check for `newgame=true`.
- Pass this information to the `canzeltly-play` component.

#### 1.5 Modify `component.play.ts`
- Add a new property `@property({ type: Boolean }) isNewGame: boolean = false;`
- In `connectedCallback()`, if `this.isNewGame` is true, load from `loadNewGameState()` instead of `loadGameState(this.gameId)`.
- When saving the game (e.g., on game over or manual save), ensure it gets saved to the regular saved games storage using `saveGameState()`.

#### 1.6 Update Routes (if needed)
- Ensure the play route can handle the query parameter. The current route parsing in `page.play.ts` should work as query params don't affect path parsing.

### Testing
- Create a new game and verify it doesn't appear in saved games list.
- Play the new game and verify it loads correctly.
- Save the game during play and verify it appears in saved games.
- Use Chrome DevTools to inspect local storage keys.

## Step 2: Add Select All Option on Saved Games Page

### Objective
Add checkboxes or buttons to select all games in the "Active Games" and "Completed Games" sections.

### Implementation Details

#### 2.1 Modify `component.games-list.ts`
- Add state for tracking select all status:
  - `@state() selectAllActive: boolean = false;`
  - `@state() selectAllCompleted: boolean = false;`
- In the render method, add select all checkboxes above each section:
  - For Active Games: `<input type="checkbox" .checked=${this.selectAllActive} @change=${this.handleSelectAllActive} /> Select All Active`
  - For Completed Games: `<input type="checkbox" .checked=${this.selectAllCompleted} @change=${this.handleSelectAllCompleted} /> Select All Completed`
- Implement handlers:
  - `handleSelectAllActive()`: Toggle selection of all active games.
  - `handleSelectAllCompleted()`: Toggle selection of all completed games.
- Update `selectedIds` accordingly and ensure the delete button reflects the changes.

### Testing
- Load saved games page with multiple active and completed games.
- Test selecting/deselecting all in each section.
- Verify the delete button enables/disables correctly.

## Step 3: Fix Delete Button on Saved Games Page

### Objective
Investigate and fix why the delete button remains disabled even when games are selected.

### Implementation Details

#### 3.1 Investigate Current Implementation
- The delete button is disabled when `selectedCount === 0`.
- `selectedCount` is `this.selectedIds.length`.
- `selectedIds` is updated in `handleToggleSelection()` via `toggleSelection(id)`.

#### 3.2 Check `component.game-preview.ts`
- Ensure the `toggle-selection` event is properly dispatched with the correct `id`.
- Verify the event detail structure matches what `handleToggleSelection` expects.

#### 3.3 Potential Issues
- Event not firing from `component.game-preview.ts`.
- `id` not matching or incorrect.
- State not updating reactively.

#### 3.4 Fix Implementation
- If bug found, correct the event dispatching or state management.
- Ensure `selectedIds` updates trigger re-render.

### Testing
- Select individual games and verify delete button enables.
- Use Chrome DevTools to check event firing and state changes.

## General Testing and Validation

### Playwright E2E Tests
- Test the full create game -> play -> save flow.
- Verify saved games list behavior.
- Test select all and delete functionality.

### Chrome DevTools Debugging
- Inspect local storage during game creation and saving.
- Check console for errors.
- Verify event dispatching.

### Build and Lint Checks
- Run `npm run fix` after changes.
- Run `npm run build` to ensure no compilation errors.

### Skill Updates
- Document any new testing techniques or findings in `.github/skills/testing/SKILL.md`.