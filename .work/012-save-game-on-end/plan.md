# Plan to Save Game to Local Storage on Game End

## Problem
The TODO in `src/client/component.play.ts` at line 107 indicates that when the game ends, it should be saved to local storage, but this is not currently implemented.

## Context
- The game ends when `this.game.state.status` is set to `GameStatus.enum.GameOver`.
- There is already a `saveGameState` function in `src/client/util.storage.ts` that can save a `GameState` to local storage.
- The component already imports `loadGameState` from util.storage, so it can import `saveGameState` as well.

## Solution
1. Import `saveGameState` from `src/client/util.storage.js` in `component.play.ts`.
2. In the game loop, after setting `this.game.state.ended = Date.now();`, call `saveGameState(this.game.state);` to save the final game state.

## Files to Modify
- `src/client/component.play.ts`: Add import and call to saveGameState.

## Testing
- Start a game, play until it ends, and check that the game appears in the saved games list.
- Verify that the saved game includes the correct end time and status.