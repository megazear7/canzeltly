# Creating New Game Modes

## Overview
This skill guide explains how to add new game modes to the Canzeltly game engine. Game modes define the rules, objectives, and initial game state for different play styles.

## Steps to Add a New Game Mode

1. **Define the Mode in Types**
   - Add the new mode name to the `GameMode` enum in `src/game/type.game.ts`
   - Ensure it's a valid Zod enum value

2. **Create Mode Function**
   - Create a new file `src/game/mode.<mode-name>.ts`
   - Implement a function `create<ModeName>Game(params)` that returns a `GameState`
   - Set appropriate `mode`, `collected`, `totalCollectibles` in the game state
   - Include player circle with necessary affects (e.g., `Collection`, `GameOver`)
   - Add initial objects (obstacles, collectibles) as per mode rules

3. **Update Game Logic**
   - Modify affects if needed (e.g., `affect.game-over.ts` for mode-specific behavior)
   - Ensure victory conditions are handled (e.g., in `affect.collection.ts` for collection-based wins)

4. **Update UI Components**
   - Add mode selection in `src/client/component.create-game.ts`
   - Update HUD in `src/client/component.heads-up-display.ts` for mode-specific displays
   - Handle mode in play component if necessary

5. **Test and Validate**
   - Run `npm run build` to check for errors
   - Test game creation, gameplay, and victory conditions
   - Ensure mode persists in saved games

## Example: Adding a "TimeAttack" Mode
- Add "TimeAttack" to `GameMode` enum
- Create `mode.time-attack.ts` with time-based setup
- Update affects for time-based game over
- Add UI for time display

## Best Practices
- Follow existing patterns for consistency
- Use descriptive function and file names
- Test thoroughly to avoid breaking existing modes
- Update this guide if patterns change