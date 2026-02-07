# Prerequisites
Add "mass" property to all game objects.

### Implementation Details:
- Add `mass: z.number().default(1)` to `GameObjectState` in `src/game/type.object.ts`
- Update all object creation functions in `src/game/object.circle.ts` and `src/game/object.rectangle.ts` to set `mass` based on size:
  - For circles: `mass: radius * radius` (area proportional to mass)
  - For rectangles: `mass: width * height` (area proportional to mass)
- This ensures larger objects have more mass for realistic physics

# Step 1
Create an "elastic collision" affect.
Any objects with this affect will bounce off of each other if they collide.

### Implementation Details:
- Add "ElasticCollision" to the `AffectCategory` enum in `src/game/game.affect.ts`
- Create `ElasticCollisionState` type in `src/game/type.object.ts` (minimal state, just category)
- Create `src/game/affect.elastic-collision.ts` with logic to:
  - Iterate through all game objects
  - For each pair of objects that both have ElasticCollision affect
  - Check for collision using `checkForCollision` from `src/shared/util.collision.ts`
  - If colliding, calculate elastic collision physics using the objects' `mass` properties
  - Update velocities accordingly using conservation of momentum and kinetic energy
- Import the elastic collision affect in `src/game/game.object.ts` and add it to the `updateState` method
- Note: This affect should probably run in `majorUpdates` or after velocity updates to avoid conflicts

# Step 2
Blockade circles should NOT end of game when the hero collides with them.
The blockades should be gray.
Blockades, hero circles, and hunters should have the elastic collision affect so that they bounce off of each other.

### Implementation Details:
- Modify `randomBlockadeCircleState` in `src/game/object.circle.ts`:
  - Remove `GameOverCollision` affect
  - Add `ElasticCollision` affect
  - Change color from `#000000` to `#808080` (gray)
  - Set `mass: radius * radius`
- Modify `heroCircle` in `src/game/object.circle.ts`:
  - Add `ElasticCollision` affect to the affects array
  - Set `mass: radius * radius`
- Modify `randomHunterCircleState` in `src/game/object.circle.ts`:
  - Add `ElasticCollision` affect to the affects array
  - Set `mass: radius * radius`
- Ensure all modes that use blockades, heroes, and hunters are updated (check `mode.survival.ts`, `mode.adventure.ts`, `mode.race.ts`)

# Step 3
There should be another circle type called "voids" that end the game if the player touches them.
Voids should be black.
Voids should be available in all of the game modes.

### Implementation Details:
- Create `randomVoidCircleState` function in `src/game/object.circle.ts`:
  - Similar to `randomBlockadeCircleState` but with `GameOverCollision` affect
  - Color: `#000000` (black)
  - No velocity or other affects, just static void that ends game on touch
  - Set `mass: radius * radius`
- Add void creation to all game modes:
  - Add `numVoid` parameter to `createSurvivalGame`, `createAdventureGame`, `createRaceGame`
  - Add loop to create voids in each mode's creation function
- Update mode functions to accept and use `numVoid` parameter
- **Client-side updates for create game page:**
  - Add number input field for voids in `src/client/component.create-game.ts`
  - Update the game creation logic in `src/client/provider.games.ts` to pass `numVoid` parameter
  - Ensure the UI labels voids appropriately (e.g., "Number of Voids")

# Step 4
There should be a new circle type available in all the game modes called "ghosts" that act like the hunters but do NOT have the elastic collision affect.
Collisions with ghosts end the game and target the player like hunters do
Ghosts should be available in all the game modes.

### Implementation Details:
- Create `randomGhostCircleState` function in `src/game/object.circle.ts`:
  - Similar to `randomHunterCircleState` but:
    - Remove `ElasticCollision` affect (if added to hunters)
    - Keep `GameOverCollision`, `TargetObject`, `Velocity`, `Ability`, `Bounce`
    - Maybe different color, e.g., `#FFFFFF` (white) or `#C0C0C0` (silver) to distinguish from hunters
    - Set `mass: radius * radius`
- Add ghost creation to all game modes:
  - Add `numGhost` parameter to mode creation functions
  - Add loop to create ghosts targeting the player
- Update mode functions to accept and use `numGhost` parameter
- **Client-side updates for create game page:**
  - Add number input field for ghosts in `src/client/component.create-game.ts`
  - Update the game creation logic in `src/client/provider.games.ts` to pass `numGhost` parameter
  - Ensure the UI labels ghosts appropriately (e.g., "Number of Ghosts")
