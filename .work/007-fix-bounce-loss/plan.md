# Fix Bounce Loss Implementation

## Problem
The TODO in `src/game/affect.bounce.ts` line 7 states: "use bounce.loss property to reduce velocity on each bounce". However, the current implementation uses `vel.dx = -vel.dx / bounce.loss;`, which does not reduce velocity correctly. If `loss` is less than 1, it amplifies velocity instead of reducing it.

## Solution
Change the velocity update to multiply by `bounce.loss` instead of dividing. Assuming `loss` is a retention factor between 0 and 1 (e.g., 0.9 means 10% energy loss).

### Code Changes
- In `src/game/affect.bounce.ts`, replace `/ bounce.loss` with `* bounce.loss` in lines 14 and 17.

### Testing
- Run the game to verify that bouncing objects lose velocity appropriately.
- Optionally, adjust `loss` values in object creation (currently set to 1) to values like 0.9 for visible effect.

## Files to Modify
- `src/game/affect.bounce.ts`</content>
<parameter name="filePath">/Users/alexlockhart/src/canzeltly/.work/007-fix-bounce-loss.md