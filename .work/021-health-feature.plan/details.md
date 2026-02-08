# Health Feature Implementation Plan

## Step 1: Update Type Definitions

### 1.1 Add Health and Damage to GameObjectState
- Modify `src/game/type.object.ts`:
  - Add `health: z.number().default(1)` to `GameObjectState`
  - Add `damage: z.number().default(1)` to `GameObjectState`
- Update `CircleState` and `RectangleState` to inherit these properties

### 1.2 Add Damage to AbilityState (Optional)
- If needed for player damage, add `damage: z.number().default(0)` to `AbilityState` in `src/game/type.object.ts`

## Step 2: Create HealthCollision Affect

### 2.1 Add HealthCollision Category
- Add `"HealthCollision"` to `AffectCategory` enum in `src/game/game.affect.ts`

### 2.2 Create HealthCollisionState
- Add `HealthCollisionState` in `src/game/type.object.ts`:
  ```typescript
  export const HealthCollisionState = AffectState.extend({
    category: z.literal(AffectCategory.enum.HealthCollision),
    layers: z.array(z.number()),
  });
  ```
- Add to `AnyAffectState` union

### 2.3 Implement HealthCollision Affect
- Create `src/game/affect.health-collision.ts`:
  - Similar to `affect.game-over.ts`
  - Check collisions with objects in specified layers
  - On collision, reduce `obj.state.health` by `otherObj.state.damage`

### 2.4 Update Game Object Update Logic
- Modify `src/game/game.object.ts` to apply the new HealthCollision affect

## Step 3: Update Game Over Affect

### 3.1 Modify Game Over Check
- Update `src/game/affect.game-over.ts`:
  - Add check for `obj.state.health <= 0`
  - If health is 0 or less, trigger game over
  - Remove old collision logic since that is now covered by the new affect.

## Step 4: Update Object Creation

### 4.1 Set Damage Values
- Modify object creation functions in `src/game/object.circle.ts`:
  - `randomVoidCircleState`: set `damage: 5`
  - `randomGhostCircleState`: set `damage: 2`
  - Other enemies: keep default `damage: 1`
  - Player (heroCircle): set `damage: 0`

### 4.2 Add Health to Player
- Modify `heroCircle` function to accept `health` parameter
- Set `health` in the returned state

## Step 5: Update Game Creation Modes

### 5.1 Modify Mode Functions
- Update `createSurvivalGame`, `createAdventureGame`, `createRaceGame`:
  - Add `health?: number` parameter (default 1)
  - Pass `health` to `heroCircle(game, playerId, health)`

## Step 6: Update Create Game Component

### 6.1 Add Health Option
- Modify `src/client/component.create-game.ts`:
  - Add `@state() health = 1;`
  - Add health slider input in `render()`: range 1-100, default 1
  - Pass `health` to create functions in `handleSubmit`

## Step 7: Update Heads Up Display

### 7.1 Add Health Display
- Modify `src/client/component.heads-up-display.ts`:
  - Add health display in HUD: `Health: ${playerHealth}`
  - Get health from player's selected object

### 7.2 Change Text Color
- Update CSS: change `color: var(--color-text);` to `color: var(--color-primary-text-bold);` for HUD text

## Step 8: Testing and Validation

### 8.1 Build and Lint
- Run `npm run fix` to fix any linting issues
- Run `npm run build` to ensure TypeScript compilation

### 8.2 Manual Testing
- Test health reduction on collisions with enemies
- Test game over when health <= 0
- Test HUD displays correct health
- Test create game with different health values

### 8.3 Automated Testing
- Use Playwright for end-to-end tests
- Use Chrome DevTools for debugging

## Dependencies
- No new dependencies required
- All changes use existing Zod schemas and TypeScript types

## Files to Modify
- `src/game/type.object.ts`
- `src/game/game.affect.ts`
- `src/game/affect.health-collision.ts` (new)
- `src/game/game.object.ts`
- `src/game/affect.game-over.ts`
- `src/game/object.circle.ts`
- `src/game/mode.survival.ts`
- `src/game/mode.adventure.ts`
- `src/game/mode.race.ts`
- `src/client/component.create-game.ts`
- `src/client/component.heads-up-display.ts`

## Potential Issues
- Ensure health is properly initialized for all objects
- Handle cases where objects don't have health (backwards compatibility)
- Update any existing tests that may break due to new properties