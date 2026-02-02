# Spacebar Input Fix - Detailed Work Plan

## Overview
Implement a new spacebar input feature that allows users to slow down (brake) selected game objects. The braking deceleration rate is based on the acceleration value from the object's Ability affect. Objects without an Ability affect cannot be braked.

## Requirements
- Spacebar key press should trigger braking for all selected objects
- Holding spacebar continuously applies braking deceleration
- Releasing spacebar stops braking
- Braking only applies to objects that have an Ability affect
- Braking deceleration uses the acceleration value from the Ability affect
- Braking should smoothly decelerate objects towards zero velocity
- When velocity magnitude drops below a small threshold (nearly 0), set velocity to exactly 0 to prevent jitter
- Spacebar should not interfere with page scrolling (prevent default)

## Technical Analysis
Based on codebase review:

### Input Handling
- Keyboard input is captured in `src/client/component.play.ts` via `keyDown` and `keyUp` events
- Pressed keys are stored in a `Set<string>` called `pressedKeys`
- The game loop calls `this.game.input.handleKeys(this.pressedKeys)` each frame
- Current keys handled: Arrow keys (viewport movement), +/- (zoom), 'c' (add circle)

### Game Objects and Selection
- Objects are selected via `player.selectedObjects` (array of object IDs)
- Selected objects are modified in `GameInput.handleCanvasClick` (sets target position)
- Objects have `affects` array containing various affect states

### Affects System
- Ability affect (`affect.ability.ts`) sets acceleration on Target affects and caps max speed on Velocity affects
- Target affect (`affect.target.ts`) accelerates objects towards a target position
- Velocity affect (`affect.velocity.ts`) applies velocity to object position each frame
- Affects are processed in the game update loop

### Braking Logic
- Braking should decelerate objects towards zero velocity
- Use acceleration value from Ability affect as deceleration rate
- Prevent overshooting zero velocity

## Implementation Steps

### 1. Update Keyboard Input Handling
**File:** `src/client/component.play.ts`
- Add " " (space) to the list of keys that prevent default in `keyDown` method
- This prevents page scrolling when spacebar is pressed

### 2. Add Spacebar Handling in Game Input
**File:** `src/game/game.input.ts`
- Modify `handleKeys` to accept `playerId` parameter (or find current player another way)
- Add spacebar check in `handleKeys` method
- Call new `applyBraking` method when spacebar is pressed

### 3. Implement Braking Logic
**File:** `src/game/game.input.ts`
- Add `applyBraking` method that:
  - Gets current player from game state (Note: need to pass playerId to handleKeys or find another way)
  - Iterates through `currentPlayer.selectedObjects`
  - For each selected object:
    - Checks if object has Ability affect
    - If yes, applies deceleration to Velocity affect using Ability acceleration value
    - Deceleration logic: reduce velocity components towards zero by acceleration amount, without overshooting
    - After deceleration, check if velocity magnitude is below a small threshold (e.g., 0.01), if so set dx=dy=0

### 4. Testing
- Test with objects that have Ability affect (can brake)
- Test with objects that don't have Ability affect (cannot brake)
- Test continuous braking while holding spacebar
- Test stopping braking when releasing spacebar
- Test braking while moving in different directions
- Test braking to complete stop (velocity set to 0 when below threshold)
- Test interaction with other inputs (targeting, etc.)

## Files to Modify
- `src/client/component.play.ts` - Add spacebar preventDefault
- `src/game/game.input.ts` - Add spacebar handling and braking logic

## Files to Review (No Changes)
- `src/game/affect.ability.ts` - Understand Ability affect structure
- `src/game/affect.target.ts` - Reference for acceleration logic
- `src/game/affect.velocity.ts` - Understand velocity application
- `src/game/type.object.ts` - Review affect and state types

## Potential Edge Cases
- Objects with zero velocity (no effect)
- Objects with very low velocity (smooth stop and threshold check)
- Multiple selected objects with different Ability values
- Braking while targeting (velocity changes from both systems)
- Objects without Velocity affect (should not happen in normal gameplay)
- Rapid spacebar press/release (ensure no jitter)