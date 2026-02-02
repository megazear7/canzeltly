# 005-players-detailed-plan.md

## Overview
This plan outlines the implementation of player management in the game state, including player objects, routing updates, local storage mapping, default game modifications, and input handling for targeting selected objects.

## Requirements Breakdown
- Add players array to game state with properties: viewportIndex, playerId (UUID), name (optional), selectedObjects (array of game object IDs)
- Update routing from `/play/:id` to `/play/game/:gameId/player/:playerId`
- Create player assignment mapping in localStorage (gameId -> playerId)
- Modify default game creation to include a single player and a circle object assigned to that player's selectedObjects
- Update input handling to set target effects on selected objects when clicking the screen, using reverse canvas mapping

## Implementation Steps

### 1. Define Player Types
- Create `src/shared/type.player.ts` with Zod schema for Player type
- Include viewportIndex (number), playerId (string, UUID), name (optional string), selectedObjects (array of strings)
- Export Player type and schema

### 2. Update Game State Types
- Modify `src/state/<state-name>.type.ts` (likely game-related state) to include players array in game state
- Ensure game state schema includes players: z.array(Player)

### 3. Update Route Parameters and Routes
- Update `src/shared/type.route-params.ts` to include playerId in route params
- Modify `src/shared/service.client.ts` routes array to change play route to `/play/game/:gameId/player/:playerId`
- Update RouteConfig entries accordingly

### 4. Update Play Page and Provider
- Modify `src/client/page.play.ts` to handle new route parameters (gameId and playerId)

### 5. Implement Player Assignment Storage
- Update `src/client/util.storage.ts` to include player assignment mapping
- Add functions to get/set playerId for a given gameId in localStorage
- Use key like "playerAssignments" storing object { [gameId: string]: playerId: string }

### 6. Modify Default Game Creation
- Update `src/game/util.new-game.ts` to generate a UUID for playerId when creating default game
- Add a single player object to the game state with the generated playerId
- Create a circle object and add its ID to the player's selectedObjects array
- Store the player assignment in localStorage during game creation

### 7. Update Game Launch Logic
- Modify game creation/launch from `src/client/page.create-game.ts` and `src/client/page.saved-games.ts`
- Use player assignment lookup to get playerId when launching existing games
- For new games, create new playerId and assignment

### 8. Implement Reverse Canvas Mapping
- Update `src/canvas/util.map-to-canvas.ts` to add reverse mapping function
- Create function to convert screen click coordinates to game world coordinates

### 9. Update Input Handling
- Modify `src/game/game.input.ts` or relevant input logic to handle click events
- On click, use reverse mapping to get game world position
- Update target effect for all selected objects of the current player to the clicked position

## Testing and Validation
- Run `npm run build` after each major change to check TypeScript compilation
- Test routing changes by navigating to updated URLs
- Verify localStorage persistence of player assignments
- Test click-to-target functionality in play mode
- Ensure default game creation includes player and selected circle

## Files to Create/Modify
- New: `src/shared/type.player.ts`
- Modify: `src/state/<state-name>.type.ts` (game state)
- Modify: `src/shared/type.route-params.ts`
- Modify: `src/shared/service.client.ts`
- Modify: `src/client/page.play.ts`
- Modify: `src/client/provider.games.ts`
- Modify: `src/client/util.storage.ts`
- Modify: `src/game/util.new-game.ts`
- Modify: `src/client/page.create-game.ts`
- Modify: `src/client/page.saved-games.ts`
- Modify: `src/canvas/util.map-to-canvas.ts`
- Modify: `src/game/game.input.ts`
- Modify: `src/game/affect.target.ts`

## Dependencies
- Ensure UUID generation utility is available (check existing utils or add if needed)
- Verify canvas mapping functions support bidirectional conversion