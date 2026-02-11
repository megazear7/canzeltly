# Fix Game Over Modal Stats

## Problem
The game over modal always shows duration as 0 seconds and victory as "Unknown". This is because the game ending logic in affects manually sets `status` and `ended` on the game state, but doesn't calculate `duration` (which requires calling the `Game.end()` method). Victory may not be set correctly or the modal may not update properly.

## Solution
- Modify `affect.collection.ts` and `affect.game-over.ts` to call `obj.game.end()` instead of manually setting `status` and `ended`.
- The `Game.end()` method properly calculates `duration = ended - started`.
- Ensure victory is set correctly in both win and lose conditions.
- Add console logs for debugging as suggested in the TODO.

## Files to Modify
- `src/game/affect.collection.ts`: Replace manual status/ended setting with `obj.game.end()` for win conditions.
- `src/game/affect.game-over.ts`: Replace manual status/ended setting with `obj.game.end()` for lose conditions.
- `src/client/component.game-over-modal.ts`: Add console logs to debug duration and victory values.

## Steps
1. Update `affect.collection.ts` to use `obj.game.end()` and ensure victory is set.
2. Update `affect.game-over.ts` to use `obj.game.end()` and ensure victory is set.
3. Add console logs in `component.game-over-modal.ts` for debugging.
4. Test the changes to ensure duration and victory display correctly.