## Stage 3
- Add a new type of circle called hunter which always moves towards the player
- The create new game page should allow you to define the number of enemy circles in three categories. All game modes should have these options:
    - Bouncy circles (already being used but needs to be made a slider option on the page)
    - Gravity circles (`randomGravityCircles` exist and needs added to the options in the create a new game page)
    - Hunter circles (new)

### Detailed Plan
1. **Create Hunter circle type:**
   - Add `randomHunterCircleState` function in `object.circle.ts`.
   - Create a Target Object affect that is has an object ID in its state, and updates itself to target that objects position.
   - Hunter circles should have affects: Velocity, Target Object (towards player), Bounce.

2. **Update game modes to accept enemy circle counts:**
   - Modify `createAdventureGame`, `createSurvivalGame`, `createRaceGame` to accept parameters: numBouncy, numGravity, numHunter.
   - Add these circles to the game layers.

3. **Update create game page:**
   - For all modes, add sliders for:
     - Number of Bouncy circles (red, default based on mode, e.g., 5 for adventure, 6 for survival).
     - Number of Gravity circles (default 0).
     - Number of Hunter circles (default 0).
   - Remove the specific numCircles for Adventure, replace with green circles slider and enemy sliders.
   - For Race, already have green circles slider, add enemy sliders.