---
name: create-new-affect
description: How to create a new type of affect
---

# Background information

Affects are functions that update an objects state. Examples include velocity, which causes an object to move in a particular direction, and bounce, which causes the object to bounce off of the edges of the game world.

# Creating a new affect

- Review the circle game object's velocity affect as an example:
    - Definition: `src/game/affect.velocity.ts`
    - Usage: `src/game/object.circle.ts`
- The affect should define a state object in `src/game/type.object.ts` which extends `AffectState` and sets the `category` property to the `z.literal` of the newly defined category.
- Choose a name for the game affect based on the it's behavior.
- Add the name to the `AffectCategory` enum in `src/game/game.affect.ts`
- Create the file `src/game/affect.some-new-affect.ts` with an exported function that implements the `affect` interface as defined in `src/game/game.affect.ts`.
- The affect function should be implemented based on the needed behavior.
- Update the `updateState` method in the `src/game/game.object.ts` to apply the new affect.

```ts
export const BounceState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;
```

# Notes

- Some affects update other affects. Review the target affect for an example of this.
- Some affects interact with game object properties directly. Review the velocity affect for an example of this.
- Some affects use game world properties. Review the bounce affect for an example of this.
- The state for the new affect can include other values, such as strength of gravity, xy coordinates, dx dy velocity, or whatever is needed for that affect.
