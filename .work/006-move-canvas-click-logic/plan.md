# Plan to Move Canvas Click Logic to GameInput Class

## Overview
Move the canvas click handling logic from `component.play.ts` into the `GameInput` class, requiring a player ID to be passed in.

## Changes Required

1. **Add `handleCanvasClick` method to `GameInput` class** (`src/game/game.input.ts`):
   - Add import for `TargetState` from `./type.object.js`
   - Add method `handleCanvasClick(playerId: string, worldX: number, worldY: number): void`
   - Implement logic to find player by ID, iterate selected objects, and set/update Target affect

2. **Update `component.play.ts`** (`src/client/component.play.ts`):
   - Modify `handleCanvasClick` to compute world position and call `this.game.input.handleCanvasClick(this.playerId, worldPos.x, worldPos.y)`
   - Remove the inline logic for setting targets
   - Remove the TODO comment

## Benefits
- Encapsulates input handling logic within the GameInput class
- Requires explicit player ID, improving clarity and preventing errors
- Follows separation of concerns by moving game logic out of the component

## Files to Modify
- `src/game/game.input.ts`
- `src/client/component.play.ts`