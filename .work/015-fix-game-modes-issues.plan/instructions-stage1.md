## Stage 1
- Adventure game mode shows "defeat" when all the green circles are collected. It should show "victory"
- Adventure game mode should also have 5 red circles.
- In create a game page, randomly come up with a game name by combining an adjective and noun from two predefined lists

### Detailed Plan
1. **Fix victory/defeat display in Adventure mode:**
   - Investigate why the game-over modal shows "Defeat" instead of "Victory" when all collectibles are gathered.
   - Review `affect.collection.ts`: It sets `player.victory = Victory.enum.Win` when `collected >= totalCollectibles` in Adventure mode.
   - Review `component.game-over-modal.ts`: It displays "Victory!" if `victory === "Win"`, else "Defeat".
   - Possible issue: Ensure the player object has the correct `victory` value. Check if the `playerId` is correctly retrieved from the `GameOver` affect on the player circle.
   - The hero circle has both `Collection` and `GameOver` affects, so it should work. Perhaps test the condition or add logging.

2. **Add 5 red circles to Adventure mode:**
   - Modify `mode.adventure.ts` to add 5 red bouncing circles using `randomBouncingCircleState(game)`.
   - These should be added to the main layer (layer 1) after the green circles.
   - Ensure they have the `Bounce` affect to make them move and bounce off walls.

3. **Implement random game name generation:**
   - In `component.create-game.ts`, if `gameName` is empty or on load, generate a random name.
   - Create arrays of adjectives and nouns, e.g., adjectives: ["Epic", "Mystic", "Cosmic", ...], nouns: ["Quest", "Journey", "Adventure", ...].
   - Combine randomly: adjective + " " + noun.
   - Set this as the default gameName when the component initializes or when creating the game if name is empty.