# Detailed Work Plan: Add Collectables Feature

## Overview
This plan implements a collectables system with three types of collectable items (food, shield, ice) that spawn randomly during gameplay and provide different benefits when collected by the hero. The system includes dynamic spawning via "occurrences" and integrates with the existing game modes and campaign system.

## Step 1: Define New Affect Categories and States
- Add "Collectable" and "Collector" to the `AffectCategory` enum in `src/game/game.affect.ts`
- Create `CollectableState` in `src/game/type.object.ts` with:
  - `category: z.literal(AffectCategory.enum.Collectable)`
  - `type: z.enum(["Food", "Shield", "Ice"])` - enum for collectable types
- Create `CollectorState` in `src/game/type.object.ts` with:
  - `category: z.literal(AffectCategory.enum.Collector)`
- Update `AnyAffectState` union to include the new states

## Step 2: Implement Collectable Affect
- Create `src/game/affect.collectable.ts` following the pattern from existing affects
- The affect function should handle the visual/state representation of collectables (no special behavior needed here, as collection is handled by collector)

## Step 3: Implement Collector Affect
- Create `src/game/affect.collector.ts`
- Implement collision detection with collectable objects
- When collision occurs:
  - Remove the collectable from the game world
  - Apply effects based on collectable type:
    - **Food**: Restore health to hero (up to starting health level)
    - **Shield**: Make hero immune to damage for 8-12 seconds (random)
    - **Ice**: Freeze all red circles, hunters, and ghosts for 4-6 seconds (random)
- Track active effects (shield immunity, ice freeze) with timestamps

## Step 4: Update Game Object Updates
- Add collectable and collector affects to the `updateState` method in `src/game/game.object.ts`
- Ensure affects are applied in the correct order (collector should check for collisions)

## Step 5: Create Collectable Object Functions
- Create `foodCircle`, `shieldCircle`, `iceCircle` functions in `src/game/object.circle.ts`
- Each function should return a `CircleState` with:
  - Appropriate radius, mass, color
  - Collectable affect with correct type
  - Impermeable affect (to prevent physics interactions)
  - Random spawn position within world bounds

## Step 6: Add Collector Affect to Hero
- Update `heroCircle` function in `src/game/object.circle.ts` to include the Collector affect

## Step 7: Implement Occurrence System
- Define `OccurrenceCategory` enum in `src/game/game.affect.ts` (or separate file) with: "SpawnFood", "SpawnShield", "SpawnIce"
- Create `OccurrenceState` schema with:
  - `category: OccurrenceCategory`
  - `chance: z.number()` - percentage chance (0-100)
- Add `occurrences: OccurrenceState[]` to `GameState` in `src/game/game.ts`
- Create occurrence functions in new files:
  - `src/game/occurrence.spawn-food.ts`
  - `src/game/occurrence.spawn-shield.ts`
  - `src/game/occurrence.spawn-ice.ts`
- Each occurrence function should:
  - Take a random chance based on `chance` property
  - If triggered, spawn the corresponding collectable using the object functions

## Step 8: Integrate Occurrences into Game Loop
- Add `runOccurrences()` method to `Game` class in `src/game/game.ts`
- Call `runOccurrences()` in the `majorUpdates()` method
- `runOccurrences()` should iterate through `this.state.occurrences` and execute each occurrence function

## Step 9: Update Create Game UI
- Add new state properties to `component.create-game.ts`:
  - `spawnFoodChance = 0`
  - `spawnShieldChance = 0`
  - `spawnIceChance = 0`
- Add slider inputs for each spawn chance (0-100) in the render method
- Update `setDefaultsForMode()` to set appropriate defaults (0 for all)
- Update `createGame()` method to pass spawn chances to mode creation functions
- Update custom game mode saving/loading to include spawn chances

## Step 10: Update Game Mode Creation Functions
- Update `createSurvivalGame`, `createAdventureGame`, `createRaceGame` to accept spawn chance parameters
- For each mode, if spawn chance > 0, add corresponding occurrence to `game.occurrences`
- For survival mode, also handle the existing `numGreenCircles` by adding a "SpawnGreenCircles" occurrence if needed (reuse existing green circle spawning logic)

## Step 11: Create New Campaign
- Add "The Flattened Spherion" campaign to `src/shared/data.campaigns.ts`
- Create 25 games with increasing difficulty using spawn chances instead of static collectables
- Include appropriate intro/victory/defeat text and upgrade options
- Ensure games progressively introduce and increase spawn rates for different collectable types

## Step 12: Update Game Summary and Storage
- Ensure new game state properties (occurrences) are properly serialized/deserialized
- Update any game summary displays if needed to show collectable statistics

## Step 13: Testing and Validation
- Test collection mechanics for each collectable type
- Verify spawn rates work correctly
- Test campaign progression
- Ensure no conflicts with existing game mechanics
- Run build and fix any TypeScript/linting errors

## Dependencies and Prerequisites
- Existing collection system (already implemented)
- Game loop and update mechanisms
- UI component system for create game page
- Campaign system structure

## Risk Assessment
- Low risk: Building on existing affect and object systems
- Medium risk: Adding new occurrence system - ensure it doesn't impact performance
- Low risk: UI changes are additive
- Test thoroughly for collision detection and effect timing