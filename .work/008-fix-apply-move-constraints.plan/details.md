# Detailed Work Plan: Fix applyMoveConstraints Method

## Overview
The `applyMoveConstraints` method in `src/game/game.input.ts` currently has flawed logic for constraining viewport movement. The method only applies constraints when the world size is smaller than or equal to the viewport size, and the logic for centering the viewport is incorrect. According to the plan, we need to implement proper constraints for both cases: when the viewport is smaller than the world (allowing 1/3 outside scrolling) and when the viewport is larger than the world (centering the viewport over the world).

## Current Issues
- The method only constrains movement when `world.width <= viewport.width` or `world.height <= viewport.height`.
- For the X-axis, it sets `maxViewportX = world.width / 2`, which does not correctly center the viewport.
- For the Y-axis, the TODO indicates the logic is flawed and needs to center the viewport on the world.
- No constraints are applied when the viewport is smaller than the world, allowing unrestricted movement that could scroll the viewport completely outside the world boundaries.

## Required Changes
Based on the plan and analysis of the viewport mapping logic (where `viewport.x` and `viewport.y` represent the center of the viewport in world coordinates), the constraints should be:

### When Viewport is Smaller than World (viewport.width < world.width)
- Allow the viewport to scroll such that 2/3 of the viewport remains over the world.
- This means 1/3 of the viewport can be outside the world on either side.
- For X-axis:
  - Minimum viewport.x: `viewport.width / 6`
  - Maximum viewport.x: `world.width - viewport.width / 6`
- For Y-axis:
  - Minimum viewport.y: `viewport.height / 6`
  - Maximum viewport.y: `world.height - viewport.height / 6`

### When Viewport is Larger than World (viewport.width >= world.width)
- Center the viewport over the world.
- For X-axis: `viewport.x = world.width / 2`
- For Y-axis: `viewport.y = world.height / 2`

## Implementation Steps
1. **Update the `applyMoveConstraints` method**:
   - Remove the existing flawed conditional logic.
   - Implement separate constraint logic for X and Y axes.
   - For each axis, check if the viewport dimension is smaller or larger than the world dimension.
   - Apply the appropriate min/max or centering logic.

2. **Code Structure**:
   - Use clear variable names for min/max calculations.
   - Add comments explaining the 1/3 outside scrolling logic.
   - Ensure the code is readable and follows TypeScript best practices.

3. **Testing**:
   - After implementation, run `npm run build` to check for compilation errors.
   - Manually test the viewport movement and zooming in the game to ensure:
     - When zoomed in (viewport smaller than world), scrolling is constrained to keep 2/3 of the viewport over the world.
     - When zoomed out (viewport larger than world), the viewport is centered over the world.
   - Verify that zooming in/out still works correctly with the updated constraints.

## Files to Modify
- `src/game/game.input.ts`: Update the `applyMoveConstraints` method.

## Validation
- Run `npm run fix` to ensure linting and formatting are correct.
- Run `npm run build` to compile TypeScript and check for errors.
- Test the game functionality to confirm viewport constraints work as expected.

## Risks
- Changing the constraint logic might affect how the viewport behaves during zooming or movement.
- Ensure that the centering logic doesn't cause the viewport to jump unexpectedly when crossing the size threshold.

## Dependencies
- No external dependencies required.
- Relies on existing `Game` and `Viewport` types from `src/game/game.js`.