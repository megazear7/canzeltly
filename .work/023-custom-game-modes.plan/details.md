## Step 1: Define Custom Game Mode Types
- Create `src/shared/type.custom-game-mode.ts` with Zod schema for CustomGameMode, including name and all configuration parameters (worldWidth, worldHeight, numCircles, mode, timeLimit, health, numGreenCircles, numBouncy, numGravity, numHunter, numBlockade, numVoid, numGhost).
- Ensure the type is imported in relevant files.

## Step 2: Update Storage Utilities
- Add functions to `src/client/util.storage.ts` for saving/loading custom game modes: `saveCustomGameMode`, `getAllCustomGameModes`, `deleteCustomGameMode`, `deleteMultipleCustomGameModes`, `loadCustomGameMode`.
- Use a new localStorage key like "canzeltly_custom_game_modes".
- Do not implement rename functionality; focus on basic CRUD.

## Step 3: Create Custom Game Modes Provider
- Create `src/client/provider.custom-game-modes.ts` extending `CanzeltlyAppProvider`.
- Define context in `src/client/context.ts` for CustomGameModesContext with status and modes array.
- Implement load method to fetch custom modes from storage.
- Handle delete events similar to games provider.

## Step 4: Create Custom Game Modes Page
- Create `src/client/page.custom-game-modes.ts` extending the new provider.
- Add route "custom_game_modes" to `src/shared/type.routes.ts` and `src/client/app.routes.ts`.
- Update `src/client/app.ts` to import and render the new page.
- Add link to home page: `<p><a href="/custom-game-modes" class="standalone">Custom Game Modes</a></p>`.

## Step 5: Create Custom Game Modes List Component
- Create `src/client/component.custom-game-modes-list.ts` similar to `component.games-list.ts`.
- Use the custom modes context.
- Display list of custom modes with name, and buttons: Play, Delete.
- Implement select all and delete multiple functionality.
- For Play button, navigate to create-game page with mode preselected using URL params.

## Step 6: Update Create Game Page for Custom Modes
- Modify `src/client/component.create-game.ts` to accept initial values from URL params.
- Add "Save Custom Game Mode" button that opens a modal for name input.
- In the modal, check if name exists; if yes, show confirmation modal.
- On save, create CustomGameMode object and save to storage.
- If overriding, confirm and replace.

## Step 7: Handle Preselection in Create Game
- When navigating from custom modes page, pass the mode name in URL (e.g., /create-game?mode=CustomModeName).
- In create-game component, parse the query param, load the custom mode, and set initial values.
- Ensure the form is still editable.

## Step 8: Refactor Components for Reusability
- Do not extract common list functionality from `component.games-list.ts`; create `component.custom-game-modes-list.ts` as a separate component that reuses styles and patterns but is not refactored into shared code.

## Step 9: Add Events for Custom Modes
- Create `src/client/event.delete-custom-modes.ts` similar to delete-games event.
- Update provider to handle delete events.

## Step 10: Testing and Validation
- Run `npm run build` to check for TypeScript errors.
- Run `npm run fix` for linting.
- Test the flow: create mode, save, list, play, delete.