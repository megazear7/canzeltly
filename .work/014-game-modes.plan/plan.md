# Rationalize the new game and create game page so that there is a single system for defining game modes
- Move `src/game/util.new-game.ts` to `src/game/mode.survival.ts` which exports a utility function that does all of the setup of the objects and returns the game state. It should have the needed parameters for accomplishing this.
- Similarly move the "Create game state" logic currently in `src/client/component.create-game.ts` to a `src/game/mode.adventure.ts`
- Update `src/client/component.create-game.ts` to allow the user to select either mode.

# Update the  surival game mode:
- You just try to survive for as long as possible
- Collecting randomly spawnning green circles
- These collected circles show up on the HUD without comparison to any total, since they just keep spawning.

# Update the adventure game mode:
- You have to collect all the green circles to win
- All the circles exist at the start of the game
- No new green circles spawn
- Collected circles show up in the HUD compared to the total, such as 2/5

# Home page:
- Default game is survival mode when launched from the quickstart link on the home page
