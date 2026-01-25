---
name: create-game-object
description: How to create a new type of game object
---

# Creating new game object types

- Review the circle game object as an example:
    - Definition: `src/game/game.circle.ts`
    - Draw: `src/canvas/draw.circle.ts`
- Choose a name for the game object
- Add the name to the `GameObjectCategory` enum in `src/game/game.object.ts`
- Define the game object state by creating a new file at `src/game/game.example.ts` with a new Zod type
    - Example: `export const ExampleState = GameObjectState.extend({...})`
- Add to `src/game/game.example.ts` file the game object class that extends `GameObject<ExampleState>`
- Add a `drawExample` method to a file at `src/canvas/draw.circle.ts`
- Update the switch statement in the `drawObject` method in the `src/canvas/draw.object.ts` file

# Notes

- `Example` in the above steps is only an example name. The actual name should be based on the user instructions.
- All of the abstract methods of `GameObject` need implemented and should be functional based on the users instructions.
- The draw method should be based on the user instructions.
