# Detailed Work Plan for Hero Sprite Implementation

## Overview
This plan implements a flexible drawing system for game objects, allowing different visual representations (circles, squares, images, ships) and specifically adds sprite-based rendering for the hero character with directional thrust images.

## Step 1: Add Draw Types to `src/game/type.object.ts`
- Add `DrawCategory` enum with values: `circle`, `square`, `image`, `ship`
- Add base `DrawState` type with `category` property of type `DrawCategory`
- Add `DrawCircle` type extending `DrawState` with `color` property
- Add `DrawSquare` type extending `DrawState` with `color` property
- Add `DrawImage` type extending `DrawState` with `image` property (string, relative path)
- Add `DrawShip` type extending `DrawState` with properties:
  - `noAccelerationImage`: string
  - `acceleratingUpImage`: string
  - `acceleratingDownImage`: string
  - `acceleratingLeftImage`: string
  - `acceleratingRightImage`: string
- Add `AnyDrawState` union type of all four draw types
- Add `draw` property of type `AnyDrawState` to `GameObjectState`

## Step 2: Update Game Object State Types
- Modify `CircleState` to remove `color` property and add `draw` property (DrawCircle)
- Modify `RectangleState` to remove `color` property and add `draw` property (DrawSquare)
- Update `AnyGameObjectState` union to include the new draw properties

## Step 3: Update Drawing Logic in `src/canvas/draw.object.ts`
- Modify `drawObject` function to check `obj.draw.category` instead of `obj.category`
- Update switch statement to handle `DrawCategory` values
- Import new draw functions for image and ship

## Step 4: Update Existing Draw Functions
- Modify `src/canvas/draw.circle.ts` to pull `color` from `obj.draw.color`
- Modify `src/canvas/draw.rectangle.ts` to pull `color` from `obj.draw.color`

## Step 5: Create New Draw Functions
- Create `src/canvas/draw.image.ts` with `drawImage` function:
  - Load image from `obj.draw.image` path
  - Center image on object position
  - Scale image based on object radius (diameter = radius * 2)
- Create `src/canvas/draw.ship.ts` with `drawShip` function:
  - Calculate primary acceleration direction from velocity affects
  - Select appropriate image based on direction
  - Render image centered and scaled like draw.image.ts

## Step 6: Update Circle Object Creation Functions
- Update all functions in `src/game/object.circle.ts` that create `CircleState` to include `draw` property with `DrawCircle` type
- For `heroCircle` function, change to use `DrawShip` type with hero images:
  - `noAccelerationImage`: "images/hero/hero.png"
  - `acceleratingUpImage`: "images/hero/hero-thrust-up.png"
  - `acceleratingDownImage`: "images/hero/hero-thrust-down.png"
  - `acceleratingLeftImage`: "images/hero/hero-thrust-left.png"
  - `acceleratingRightImage`: "images/hero/hero-thrust-right.png"

## Step 7: Update Rectangle Objects (if any)
- Check for rectangle object creation functions and update similarly

## Step 8: Testing and Validation
- Run `npm run build` to check for TypeScript errors
- Run `npm run fix` to ensure code formatting
- Test game rendering to verify hero sprite displays correctly
- Verify acceleration directions show appropriate thrust images

## Dependencies
- Requires existing hero images in `src/static/images/hero/`
- No new external dependencies needed

## Files to Modify
- `src/game/type.object.ts`
- `src/canvas/draw.object.ts`
- `src/canvas/draw.circle.ts`
- `src/canvas/draw.rectangle.ts`
- `src/game/object.circle.ts`

## Files to Create
- `src/canvas/draw.image.ts`
- `src/canvas/draw.ship.ts`