# Plan to Fix Duration Calculation

## Problem
The TODO in `src/client/component.play.ts` at line 113 indicates that the duration calculation is not working correctly - it always shows as 0 seconds in the game over modal.

## Context
- Duration is accumulated every second in the game loop: `this.game.state.duration += currentTime - lastMajorUpdate;`
- When the game ends, the code sets `this.game.state.ended = Date.now();` and immediately returns, preventing the duration update logic from running
- This means the final partial second of gameplay is never added to the duration
- The duration is displayed in the game over modal as seconds: `Math.round(this.game.state.duration / 1000)`

## Solution
When the game ends, calculate and add the remaining time from the last major update to the current end time to the duration, before setting the ended timestamp.

## Files to Modify
- `src/client/component.play.ts`: Add duration update when game ends

## Testing
- Start a game and let it run for a few seconds, then trigger game over
- Check that the duration in the game over modal shows the correct number of seconds played
- Test with games that end quickly (under 1 second) and ensure duration shows 0 or 1 appropriately