# Detailed Work Plan: Create Ability Affect for Acceleration and Max Speed

## Overview
Implement a new "Ability" affect that modifies the acceleration of the `Target` affect and sets a maximum speed for the `Velocity` affect. This affect should be applied last in the update cycle, after all other affects. Additionally, update the `randomBouncingCircleState` function to include this new ability affect.

## Current State Analysis
- Affects are defined in `src/game/game.affect.ts` with categories: Bounce, Velocity, Target, Gravity.
- Each affect has a corresponding state type in `src/game/type.object.ts`.
- Affects are applied in `GameObject.updateState()` in `src/game/game.object.ts`.
- The `Velocity` affect currently has `dx` and `dy` properties but no speed limiting.
- The `Target` affect has an `acceleration` property.
- `randomBouncingCircleState` in `src/game/object.circle.ts` creates circles with Velocity and Bounce affects.

## Required Changes

### 1. Update AffectCategory Enum
- Add "Ability" to the `AffectCategory` enum in `src/game/game.affect.ts`.

### 2. Define AbilityState Type
- In `src/game/type.object.ts`, create `AbilityState` extending `AffectState` with:
  - `acceleration`: number (value to set on Target affect)
  - `maxSpeed`: number (value to set on Velocity affect)
- Add `AbilityState` to the `AnyAffectState` union.

### 3. Add maxSpeed to VelocityState
- Extend `VelocityState` in `src/game/type.object.ts` to include `maxSpeed?: number` (optional, since existing objects may not have it).

### 4. Update Velocity Affect
- Modify `affect.velocity.ts` to enforce the maximum speed if `maxSpeed` is set:
  - After updating position, calculate current speed.
  - If speed exceeds `maxSpeed`, scale `dx` and `dy` down proportionally.

### 5. Create Ability Affect
- Create `src/game/affect.ability.ts` with an exported `ability` function implementing the `affect` interface.
- The function should:
  - Find the `Target` affect on the object and set its `acceleration` to the ability's `acceleration`.
  - Find the `Velocity` affect on the object and set its `maxSpeed` to the ability's `maxSpeed`.

### 6. Update GameObject Update Logic
- Modify `updateState()` in `src/game/game.object.ts` to apply the Ability affect last:
  - Apply all non-Ability affects first.
  - Then apply Ability affects.
- Add import for the new `ability` function.

### 7. Update randomBouncingCircleState
- In `src/game/object.circle.ts`, add an Ability affect to the affects array in `randomBouncingCircleState`.
- Set example values: `acceleration: 0.1`, `maxSpeed: 5.0`.

## Implementation Steps
1. Update `AffectCategory` enum.
2. Define `AbilityState` and update `VelocityState` in `type.object.ts`.
3. Modify `affect.velocity.ts` to enforce max speed.
4. Create `affect.ability.ts`.
5. Update `game.object.ts` to apply Ability last and import the new affect.
6. Update `randomBouncingCircleState` to include the Ability affect.

## Testing
- Run `npm run build` to ensure no TypeScript errors.
- The game should load with bouncing circles that have controlled acceleration and speed limits.
- Verify that Ability affect modifies Target and Velocity affects correctly.

## Files to Modify
- `src/game/game.affect.ts`: Add Ability to enum.
- `src/game/type.object.ts`: Add AbilityState, update VelocityState, update AnyAffectState.
- `src/game/affect.velocity.ts`: Add max speed enforcement.
- `src/game/affect.ability.ts`: New file.
- `src/game/game.object.ts`: Update updateState logic and imports.
- `src/game/object.circle.ts`: Update randomBouncingCircleState.

## Dependencies
- No external dependencies.
- Builds on existing affect system.