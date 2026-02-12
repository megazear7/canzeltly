# Prompt: Create a New Game Mode

## Instructions

Follow the steps below to implement a new game mode for the Canzeltly game engine. Replace placeholders with the specific mode details.

## User Input

- Mode Name: [e.g., "BossFight"]
- Description: [Brief description of the mode's rules and objectives]
- Special Rules: [Any unique mechanics, e.g., "Player must defeat a boss enemy"]

## Implementation Steps

1. **Add Mode to Types**
   - Update `src/game/type.game.ts` to include the new mode in `GameMode` enum

2. **Create Mode File**
   - Create `src/game/mode.<mode-slug>.ts`
   - Implement `create<ModeName>Game(params: { width, height, playerId, ... })` function
   - Return a complete `GameState` with:
     - mode: "<ModeName>"
     - collected: 0
     - totalCollectibles: [number or undefined]
     - Player circle with appropriate affects
     - Initial objects (enemies, obstacles, etc.)

3. **Update Affects if Needed**
   - Modify existing affects (e.g., `affect.game-over.ts`) for mode-specific logic
   - Create new affects if required for special mechanics

4. **Update UI**
   - Add mode option in `src/client/component.create-game.ts`
   - Update HUD in `src/client/component.heads-up-display.ts` for mode displays
   - Ensure play component handles the mode correctly

5. **Test**
   - Build and run the game
   - Verify mode selection, gameplay, and victory conditions
   - Check saved games retain mode

## Validation Checklist

- [ ] Mode appears in create-game UI
- [ ] Game starts with correct initial state
- [ ] Special rules/mechanics work as expected
- [ ] Victory/loss conditions trigger properly
- [ ] HUD displays relevant information
- [ ] No build errors or runtime issues

## Notes

- Reference existing modes (`mode.survival.ts`, `mode.adventure.ts`) for patterns
- Use Zod schemas for type safety
- Follow the project's coding conventions
