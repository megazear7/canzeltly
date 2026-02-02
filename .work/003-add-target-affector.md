# 003 - Add Target Affector

## Objective
Create a new affector called "target" that updates the velocity affectors, applying a constant acceleration towards a particular target x,y coordinate. Update the randomMovingCircleState method to use this affector.

## Steps

1. **Update AffectorCategory enum** in `src/game/game.affector.ts`:
   - Add "Target" to the z.enum(["Bounce", "Velocity"])

2. **Create TargetState type** in `src/game/type.object.ts`:
   - Define TargetState extending AffectorState with category: z.literal(AffectorCategory.enum.Target), x: z.number(), y: z.number(), acceleration: z.number()
   - Add TargetState to the AnyAffectorState union

3. **Create target affector function** in `src/game/affector.target.ts`:
   - Implement the affector function that finds the Velocity affector in the object's affectors
   - Calculate the direction vector from current position to target (x, y)
   - Normalize the direction and apply acceleration to dx, dy of the velocity affector

4. **Update game object update logic** in `src/game/game.object.ts`:
   - Import the target affector
   - Add the if condition for AffectorCategory.enum.Target to call target(this)

5. **Update randomMovingCircleState** in `src/game/object.circle.ts`:
   - Add the Target affector to the affectors array with a random target position

## Files to Modify
- `src/game/game.affector.ts`
- `src/game/type.object.ts`
- `src/game/affector.target.ts` (new file)
- `src/game/game.object.ts`
- `src/game/object.circle.ts`

## Validation
- Run `npm run build` to ensure TypeScript compiles without errors
- Test that circles move towards their target over time</content>
<parameter name="filePath">/Users/alexlockhart/src/canzeltly/.work/003-add-target-affector.md