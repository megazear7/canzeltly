# Health Updates Work Plan

## Overview
Refactor the health system to move health from game object properties to a dedicated "Health" affect. Introduce an "OverlappingDamage" affect for continuous damage based on overlap, and update the "ElasticCollision" affect to handle damage directly on collision with new properties (Damage, AttackSpeed, LastAttack, MakesAttacks, ReceivesAttacks). Remove the "HealthCollision" affect as it's no longer needed. Update game over logic to check health from the Health affect. Update existing object types to use the new affects with attack speed of 1000ms, where only the hero receives damage.

## Steps

### 1. Create Health Affect
- **File**: `src/game/affect.health.ts`
- **Description**: Create a new affect that manages the health state for objects.
- **Implementation**:
  - Define `HealthState` in `src/game/type.object.ts` extending `AffectState` with `category: z.literal(AffectCategory.enum.Health)` and `health: z.number()`.
  - Add "Health" to `AffectCategory` enum in `src/game/game.affect.ts`.
  - Implement the `health` affect function that does nothing (health is managed by other affects).
  - Add `HealthState` to `AnyAffectState` union.
  - Update `updateAffects` in `src/game/game.object.ts` to call the new `health` affect (though it may be a no-op).

### 2. Create OverlappingDamage Affect
- **File**: `src/game/affect.overlapping-damage.ts`
- **Description**: Create an affect for continuous damage when objects overlap, with cooldown based on attack speed.
- **Implementation**:
  - Define `OverlappingDamageState` in `src/game/type.object.ts` extending `AffectState` with:
    - `category: z.literal(AffectCategory.enum.OverlappingDamage)`
    - `damage: z.number().default(0)`
    - `attackSpeed: z.number()` (in ms)
    - `lastAttack: z.number().default(0)` (unix timestamp)
    - `makesAttacks: z.boolean()`
    - `receivesAttacks: z.boolean()`
  - Add "OverlappingDamage" to `AffectCategory` enum.
  - Implement the `overlappingDamage` affect function:
    - For each object with OverlappingDamage, check overlapping objects with OverlappingDamage.
    - If `makesAttacks` and other `receivesAttacks`, and current time - lastAttack >= attackSpeed, subtract damage from other's health (via Health affect) and update lastAttack.
  - Add `OverlappingDamageState` to `AnyAffectState` union.
  - Update `updateAffects` to call `overlappingDamage`.

### 3. Update ElasticCollision Affect
- **File**: `src/game/affect.elastic-collision.ts`
- **Description**: Update to include damage properties and apply damage directly on collision.
- **Implementation**:
  - Update `ElasticCollisionState` in `src/game/type.object.ts` to extend with:
    - `damage: z.number().default(0)`
    - `attackSpeed: z.number()` (in ms)
    - `lastAttack: z.number().default(0)`
    - `makesAttacks: z.boolean()`
    - `receivesAttacks: z.boolean()`
  - Modify the `elasticCollision` affect function:
    - On collision, if `makesAttacks` and other `receivesAttacks`, and cooldown passed, subtract damage from other's health and update lastAttack.
    - Remove the code that pushes to HealthCollision collisions.
  - Keep the physics collision response unchanged.

### 4. Remove HealthCollision Affect
- **Files**: `src/game/affect.health-collision.ts`, `src/game/type.object.ts`, `src/game/game.affect.ts`, `src/game/game.object.ts`
- **Description**: Remove the old health collision system.
- **Implementation**:
  - Delete `src/game/affect.health-collision.ts`.
  - Remove `HealthCollision`, `HealthCollisionState` from `src/game/type.object.ts`.
  - Remove "HealthCollision" from `AffectCategory` enum.
  - Remove `HealthCollisionState` from `AnyAffectState` union.
  - Remove the call to `healthCollision` from `updateAffects` in `src/game/game.object.ts`.
  - Remove import of `healthCollision`.

### 5. Update GameObjectState
- **File**: `src/game/type.object.ts`
- **Description**: Remove health and damage properties from base state.
- **Implementation**:
  - Remove `health: z.number().default(1)` and `damage: z.number().default(1)` from `GameObjectState`.
  - Update all usages in object creation functions to remove these properties.

### 6. Update Game Over Logic
- **File**: `src/game/affect.game-over.ts`
- **Description**: Change health check to use Health affect instead of obj.state.health.
- **Implementation**:
  - In `gameOver` affect, find the Health affect on the object and check its health <= 0.

### 7. Update Existing Object Types
- **Files**: `src/game/object.circle.ts`, `src/game/object.rectangle.ts`, `src/game/util.new-game.ts`
- **Description**: Add Health and updated affects to objects, remove old properties.
- **Implementation**:
  - For hero objects (e.g., `heroCircle`):
    - Add `Health` affect with initial health.
    - Add `OverlappingDamage` or `ElasticCollision` with `receivesAttacks: true`, `makesAttacks: false`, `attackSpeed: 1000`.
    - Remove `health` property.
    - Remove `HealthCollision` affect.
  - For enemy objects (e.g., `randomBouncingCircleState`):
    - Add `Health` affect.
    - Update `ElasticCollision` with `makesAttacks: true`, `receivesAttacks: false`, `attackSpeed: 1000`, `damage: 1`.
    - Remove `health` and `damage` properties.
  - Update any other object creation functions similarly.
  - Ensure ghosts and voids do not have damage affects (as per plan).

### 8. Update Imports and References
- **Files**: All files using old affects or properties.
- **Description**: Ensure all references are updated.
- **Implementation**:
  - Update any imports of removed affects.
  - Check for usages of `obj.state.health` and replace with health from Health affect.
  - Run build to catch any missing updates.

### 9. Testing and Validation
- **Description**: Ensure the changes work correctly.
- **Implementation**:
  - Run `npm run build` to check for compilation errors.
  - Run `npm run fix` for linting.
  - Test game modes to ensure health damage works as expected.
  - Verify game over triggers on health <= 0.
  - Check that overlapping damage and collision damage apply correctly with cooldowns.