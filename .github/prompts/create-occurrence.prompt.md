# Create Occurrence Prompt

You are implementing a new occurrence system feature. An occurrence is a dynamic spawning mechanism that runs on every major game update.

## User Instructions

`${input:instructions}`

## Steps

- Analyze the user instructions to understand what type of occurrence to create
- Determine the occurrence category name (e.g., "SpawnFood", "SpawnEnemy")
- Add the category to the `OccurrenceCategory` enum in `src/game/game.affect.ts`
- Create the occurrence file at `src/game/occurrence.<category>.ts`
- Implement the occurrence function that takes `(occurrence: OccurrenceState, game: Game)` parameters
- Add the occurrence to the switch statement in `runOccurrences` in `src/game/game.ts`
- Update any relevant UI components if the occurrence needs configuration options
- Test the occurrence by adding it to a game mode and verifying it spawns correctly

## Notes

- Occurrences use a chance-based system (0-100%)
- Use `game.addObject(state)` to spawn objects
- Keep occurrence logic lightweight as it runs frequently
- Follow the pattern of existing occurrences like `spawnFood`
