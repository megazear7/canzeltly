## Stage 2
- Add a game mode that where the player is given a certain amount of time to collect the green circles. This is a "race" game mode and the create new page should allow the time to be selected (slider defining the number of seconds 1-300 with a default of 60)
- This race game mode has 1 red circle and slider option for the number of green circles (default 5)

### Detailed Plan
1. **Create new Race game mode:**
   - Create `mode.race.ts` similar to `mode.adventure.ts` and `mode.survival.ts`.
   - The mode should have a time limit instead of collecting all circles.
   - Parameters: timeLimit (in seconds), numGreenCircles (default 5), numRedCircles (1).
   - Game state: mode: "Race", timeLimit, startTime, etc.
   - Add 1 red bouncing circle and numGreenCircles green collectible circles.
   - Victory condition: If time runs out without collecting all, lose. If all collected before time, win.
   - Need to add time-based game over logic, perhaps in a new affect or modify existing.

2. **Update create game page for Race mode:**
   - Add "Race" radio button in the mode selection.
   - When Race is selected, show sliders for:
     - Time limit: 1-300 seconds, default 60.
     - Number of green circles: 1-100, default 5.
   - Hide numCircles slider for Race, as it's specific.

3. **Implement time-based game over:**
   - In the game loop or affects, check if current time - startTime > timeLimit, then set game over and lose.
   - For collection, if collected >= totalCollectibles, win.
   - Update game state to include timeLimit and startTime.