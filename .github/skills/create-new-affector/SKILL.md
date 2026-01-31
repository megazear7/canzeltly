---
name: create-game-object
description: How to create a new type of affect
---

# Background information

Affects are functions that update an objects state. Examples include velocity, which causes an object to move in a particular direction, and bounce, which causes the object to bounce off of the edges of the game world.

# Creating a new affect

- Choose a name for the affect.
- A new category should be defined in the `AffectCategory` enum for this new affect.
- The affect should define a state object in `src/game/type.object.ts` which extends `AffectState` and sets the `category` property to the `z.literal` of the newly defined category.
- The state for the new affect can include other values, such as strength of gravity, xy coordinates, dx dy velocity, or whatever is needed for that affect.
- Create the file `src/game/affect.some-new-affect.ts` with an exported function that implements the `affect` interface as defined in `src/game/game.affect.ts`

```ts
export const BounceState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;
```