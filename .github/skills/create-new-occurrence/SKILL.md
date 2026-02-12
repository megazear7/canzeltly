---
name: create-new-occurrence
description: How to create a new type of occurrence for dynamic game world spawning
---

# Background information

Occurrences are functions that run on every major game update to dynamically spawn objects or modify the game world. Examples include spawning food, shields, or ice collectables based on chance percentages.

# Creating a new occurrence

- Review existing occurrence implementations as examples:
  - Definition: `src/game/occurrence.spawn-food.ts`
  - Usage: `src/game/game.ts` in the `runOccurrences` method
- Choose a name for the occurrence based on its behavior (e.g., "SpawnFood", "SpawnShield")
- Add the name to the `OccurrenceCategory` enum in `src/game/game.affect.ts`
- Create the file `src/game/occurrence.some-new-occurrence.ts` with an exported function that takes `(occurrence: OccurrenceState, game: Game)` parameters
- Implement the occurrence logic, typically checking `Math.random() * 100 < occurrence.chance` and spawning objects using `game.addObject()`
- The occurrence function should be added to the switch statement in `runOccurrences` in `src/game/game.ts`

# Notes

- Occurrences are defined with a `chance` property (0-100 percentage)
- Use `game.addObject(state)` to spawn new objects into the game world
- Occurrences run on every major update, so keep them lightweight
- The occurrence category should be descriptive of the spawning behavior
