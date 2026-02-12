---
name: create-game-object
description: How to create a new type of game object
---

# Creating new game object types

- Review the circle game object as an example:
  - Definition: `src/game/object.circle.ts`
  - Draw: `src/canvas/draw.circle.ts`
- Choose a name for the game object
- Add the name to the `GameObjectCategory` enum in `src/game/type.object.ts`
- Define the game object state by adding a new Zod type to `src/game/type.object.ts`
  - Example: `export const ExampleState = GameObjectState.extend({...})`
- Create a new file at `src/game/object.example.ts` with the game object class that extends `GameObject<ExampleState>`
- Create a new file at `src/canvas/draw.example.ts` with a `drawExample` function
- Update the switch statement in the `drawObject` method in the `src/canvas/draw.object.ts` file

# Notes

- `Example` in the above steps is only an example name. The actual name should be based on the user instructions.
- All of the abstract methods of `GameObject` need implemented and should be functional based on the users instructions.
- The draw method should be based on the user instructions.
