# Detailed Work Plan: Fix Game Bugs

## Issue 1: Automatic Game Names Not Working
**Problem**: The game name input field starts empty, and users expect it to be pre-filled with a random name for automatic naming.

**Solution**: In the `CanZeltlyCreateGameComponent` constructor, generate and set a random game name to pre-fill the input field.

**Files to modify**:
- `src/client/component.create-game.ts`: Update constructor to set `this.gameName = this.generateRandomName();`

## Issue 2: Game Over Logic in Adventure Mode
**Problem**: Capturing green circles (collectibles) causes game over because the player's `GameOver` affect triggers on collision with any object in layer 1, including collectibles.

**Solution**: 
- Add a new affect category `GameOverCollision` for objects that should cause game over when collided with.
- Modify the `gameOver` affect to only check collisions with objects that have the `GameOverCollision` affect.
- Add the `GameOverCollision` affect to red circles in all game modes.

**Files to modify**:
- `src/game/game.affect.ts`: Add "GameOverCollision" to `AffectCategory` enum.
- `src/game/type.object.ts`: Add `GameOverCollisionState` type and include in `AnyAffectState` union.
- `src/game/affect.game-over.ts`: Update logic to check for objects with `GameOverCollision` affect instead of all objects in layers.
- `src/game/object.circle.ts`: Add `GameOverCollision` affect to `randomBouncingCircleState` (red circles).
- `src/game/game.object.ts`: Add case for `GameOverCollision` in `updateState` (though it may not need an active affect function).

## Issue 3: Hunter Circles Not Moving
**Problem**: Hunter circles have `TargetObject` affect with `objectId` set to `playerId` (string), but should target the player's circle object ID.

**Solution**: Update `randomHunterCircleState` to find the player's selected object ID and set `objectId` to that.

**Files to modify**:
- `src/game/object.circle.ts`: Modify `randomHunterCircleState` to set `objectId` to the player's circle ID.

## Implementation Steps
1. Update affect types and categories for `GameOverCollision`.
2. Modify `gameOver` affect logic.
3. Add `GameOverCollision` to red circles.
4. Fix hunter circle targeting.
5. Pre-fill game name input.
6. Test changes by running `npm run build` and `npm run fix`.