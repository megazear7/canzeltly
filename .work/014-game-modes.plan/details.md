# Detailed Work Plan: Implement Game Modes

## Overview
This plan implements two game modes: **Survival** (endless survival by collecting spawning green circles while avoiding red obstacles) and **Adventure** (collect all pre-placed green circles to win). The work involves refactoring game creation logic into mode-specific functions, updating the create-game page for mode selection, modifying game logic for collection/victory, and enhancing the HUD for mode-specific displays.

## Prerequisites
- Review existing code: `src/game/util.new-game.ts`, `src/client/component.create-game.ts`, `src/game/affect.game-over.ts`, `src/client/component.heads-up-display.ts`, `src/game/game.ts`, and related types.
- Ensure familiarity with Zod schemas, Lit components, and game affects system.

## Step 1: Add Mode-Specific Types and State
- **File**: `src/game/type.game.ts`
- **Task**: Add new types for game modes and collection tracking.
  - Define `GameMode` enum with "Survival" and "Adventure".
  - Add `collected: z.number().default(0)` and `totalCollectibles: z.number().optional()` to `GameState` schema.
  - Update `GameState` to include `mode: GameMode`.
- **Rationale**: Enables mode differentiation and collection tracking without breaking existing code.

## Step 2: Create Survival Mode Function
- **File**: `src/game/mode.survival.ts` (new file)
- **Task**: Refactor `util.new-game.ts` logic into a survival mode function.
  - Move core setup from `newGame` to `createSurvivalGame(params)`.
  - Include player circle (green), background, and initial 6 red bouncing obstacles.
  - Add logic to spawn new green collectible circles periodically (e.g., every 5-10 seconds).
  - Set `mode: "Survival"`, `collected: 0`, `totalCollectibles: undefined`.
  - Ensure red circles trigger game over on collision (reuse existing `GameOver` affect).
- **Dependencies**: Import from `object.circle.ts`, `type.object.ts`, etc.
- **Rationale**: Isolates survival logic for reuse in quickstart and create-game.

## Step 3: Create Adventure Mode Function
- **File**: `src/game/mode.adventure.ts` (new file)
- **Task**: Refactor create-game logic into an adventure mode function.
  - Move setup from `component.create-game.ts` to `createAdventureGame(params)`.
  - Include player circle (distinct color, e.g., blue), background, and user-specified number of green collectible circles (no bouncing).
  - Set `mode: "Adventure"`, `collected: 0`, `totalCollectibles: numCircles`.
  - Remove red obstacles; focus on collection without game over from collisions.
- **Dependencies**: Import from `object.circle.ts`, `type.object.ts`, etc.
- **Rationale**: Isolates adventure logic for create-game page.

## Step 4: Add Collection Affect
- **File**: `src/game/affect.collection.ts` (new file)
- **Task**: Implement collection logic.
  - Create `collection` affect function that checks collision between player and collectibles.
  - On collision: remove collectible, increment `game.state.collected`.
  - For Adventure: if `collected === totalCollectibles`, set status to "GameOver" and victory to "Win".
  - Attach to player circle in mode functions.
- **File**: `src/game/game.affect.ts`
- **Task**: Register new `Collection` category in `AffectCategory` enum.
- **File**: `src/game/type.object.ts`
- **Task**: Add `CollectionState` type (minimal, e.g., just category).
- **File**: `src/game/game.object.ts`
- **Task**: Add collection affect to `updateState()` loop.
- **Rationale**: Enables collectible mechanics without modifying core collision system.

## Step 5: Update Create-Game Component for Mode Selection
- **File**: `src/client/component.create-game.ts`
- **Task**: Add mode selection UI and logic.
  - Add radio buttons or dropdown for "Survival" or "Adventure".
  - Update form to conditionally show "Number of Circles" only for Adventure.
  - In `handleSubmit`: call `createSurvivalGame` or `createAdventureGame` based on selection.
  - Remove old inline game creation logic.
- **Dependencies**: Import new mode functions.
- **Rationale**: Allows users to choose mode when creating games.

## Step 6: Update Home Page for Survival Default
- **File**: `src/client/page.home.ts`
- **Task**: Modify quickstart link to use survival mode.
  - Update link generation to pass mode or ensure quickstart games default to survival (via `createSurvivalGame` in play logic).
- **File**: `src/client/component.play.ts`
- **Task**: Adjust game loading for quickstart.
  - In `connectedCallback`, for quickstart IDs (e.g., starting with "quickstart-"), use `createSurvivalGame` instead of `newGame`.
- **Rationale**: Quickstart launches survival mode as specified.

## Step 7: Update HUD for Mode-Specific Display
- **File**: `src/client/component.heads-up-display.ts`
- **Task**: Add collection display.
  - Add property for `game` (already exists).
  - In `render()`, show collected count: for Survival "Collected: X", for Adventure "Collected: X/Y".
  - Position in HUD (e.g., next to FPS).
- **Rationale**: Provides feedback on progress per mode.

## Step 8: Update Game Over Logic
- **File**: `src/game/affect.game-over.ts`
- **Task**: Make game over mode-aware.
  - For Survival: keep collision with red circles triggering game over.
  - For Adventure: Both collisions with red circles and collection triggers game over
  - Update affect to check `game.state.mode`.

## Step 9: Remove Old Files and Clean Up
- **File**: `src/game/util.new-game.ts`
- **Task**: Delete or deprecate (after confirming no other usages).
- **File**: `src/client/component.create-game.ts`
- **Task**: Remove old game creation code.
- **Rationale**: Eliminates duplication.

## Step 10: Add Skills and Prompts for Creating New Game Modes
- **File**: `.github/skills/create-new-game-mode.md` (new file)
- **Task**: Create a skill guide explaining how to add new game modes using the established pattern (e.g., create `mode.xxx.ts`, add to types, update UI, handle affects).
- **File**: `.github/prompts/create-game-mode.prompt.md` (new file)
- **Task**: Create a prompt template for Copilot to follow when implementing new game modes, including steps similar to this plan (e.g., define mode function, update types, add to create-game UI).
- Make sure to review existing prompts and skills and follow the same format.
- **Rationale**: Enables easy addition of future game modes by following a consistent process and provides guidance for developers.

## Step 11: Testing and Validation
- **Manual Testing**:
  - Quickstart: Launches survival mode, spawns green circles, avoids red, collects infinitely.
  - Create Game: Select Survival (similar to quickstart) or Adventure (collect all to win).
  - HUD: Updates correctly per mode.
  - Victory: Survival ends on collision, Adventure ends on full collection.
- **Build Check**: Run `npm run build` after each major change.
- **Linting**: Run `npm run fix` to ensure code quality.

## Potential Challenges
- Spawning logic for Survival: May need a new affect or timer in game loop.
- Mode persistence: Ensure saved games retain mode (update storage if needed).
- UI consistency: Ensure mode selection fits existing styles.
