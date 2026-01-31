---
name: create-game-object
description: How to create a new type of affector
---

# Background information

Affectors are functions that update an objects state. Examples include velocity, which causes an object to move in a particular direction, and bounce, which causes the object to bounce off of the edges of the game world.

# Creating a new affector

- Choose a name for the affector.
- A new category should be defined in the `AffectorCategory` enum for this new affector.
- The affector should define a state object in `src/game/type.object.ts` which extends `AffectorState` and sets the `category` property to the `z.literal` of the newly defined category.
- The state for the new affector can include other values, such as strength of gravity, xy coordinates, dx dy velocity, or whatever is needed for that affector.
- Create the file `src/game/affector.some-new-affector.ts` with an exported function that implements the `affector` interface as defined in `src/game/game.affector.ts`

```ts
export const BounceState = AffectorState.extend({
  category: z.literal(AffectorCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;
```