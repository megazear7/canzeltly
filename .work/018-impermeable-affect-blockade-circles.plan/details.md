# Detailed Work Plan: Impermeable Affect and Blockade Circles

## Overview
This plan implements three main features:
1. A new "blockade" circle type that ends the game on collision but doesn't move
2. An "impermeable" affect that prevents objects from overlapping by moving them apart
3. Integration of the impermeable affect with green collectible circles to prevent spawning on blockades

## Step 1: Add Impermeable Affect Category and State
- Add "Impermeable" to the `AffectCategory` enum in `src/game/game.affect.ts`
- Define `ImpermeableState` in `src/game/type.object.ts` extending `AffectState`

## Step 2: Create Impermeable Affect Implementation
- Create `src/game/affect.impermeable.ts` with the impermeable function
- The function should:
  - Iterate through all objects in the same layer
  - For each other object, check if colliding using `checkForCollision` from `shared/util.collision.ts`
  - If colliding, calculate the overlap distance and direction
  - Move the current object away from the colliding object by the overlap amount
- Import and use the collision utility function

## Step 3: Modify Game Update Logic for Major Updates
- Add `majorUpdates()` method to `Game` class in `src/game/game.ts`
- Add `majorUpdates()` method to `GameObject` class in `src/game/game.object.ts`
- Create a `majorAffects` array as a constant listing affects that only run on major updates
- In `GameObject.majorUpdates()`, apply the majorAffects
- Add "Impermeable" to the majorAffects list

## Step 4: Update Client Game Loop
- Modify `component.play.ts` to call `this.game.majorUpdates()` when major update occurs (every 1000ms)
- Keep the regular `this.game.update()` call every frame

## Step 5: Create Blockade Circle Type
- Add `randomBlockadeCircleState()` function in `src/game/object.circle.ts`
- Blockade circles should have:
  - Static position (no velocity affects)
  - `GameOverCollision` affect to end game on contact
  - Distinctive color (e.g., black or dark gray)
  - Appropriate radius and positioning

## Step 6: Add Blockade Circles to Game Modes
- Update `createAdventureGame()` in `src/game/mode.adventure.ts` to accept `numBlockade` parameter
- Add blockade circles to the main objects layer
- Ensure blockades are positioned to create navigation challenges
- Update other game modes (race, survival) similarly if needed

## Step 7: Add Impermeable Affect to Green Circles
- In `createAdventureGame()`, modify the green collectible circles to include the `Impermeable` affect
- This ensures collectibles don't spawn overlapping with blockades and move away if they do

## Step 8: Update UI for Blockade Configuration
- Modify `component.create-game.ts` to include blockade count input for adventure mode
- Ensure the UI properly passes `numBlockade` to the game creation function

## Testing and Validation
- Test that impermeable affect moves objects apart on major updates
- Verify blockades end the game on collision but don't move
- Confirm green circles with impermeable affect don't overlap blockades
- Run `npm run build` after each major change
- Test in different game modes and scenarios

## Files to Modify
- `src/game/game.affect.ts` - Add Impermeable category
- `src/game/type.object.ts` - Add ImpermeableState
- `src/game/affect.impermeable.ts` - New file
- `src/game/game.ts` - Add majorUpdates() method
- `src/game/game.object.ts` - Add majorUpdates() method and majorAffects constant
- `src/client/component.play.ts` - Call majorUpdates() on major update
- `src/game/object.circle.ts` - Add randomBlockadeCircleState
- `src/game/mode.adventure.ts` - Add blockades and impermeable to collectibles
- `src/client/component.create-game.ts` - Add blockade UI controls

## Dependencies
- Utilizes existing `checkForCollision` function
- Follows existing affect implementation patterns
- Compatible with current game loop architecture