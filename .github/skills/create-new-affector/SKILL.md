---
name: create-new-affector
description: How to create a new type of affector
---

# Creating a new affector

- Choose a name for the affector.
- A new category should be defined in the `AffectCategory` enum for this new affector.
- The affector should define a state object in `src/game/type.object.ts` which extends `AffectState` and sets the `category` property to the `z.literal` of the newly defined category.
- The state for the new affector can include other values, such as strength of gravity, xy coordinates, dx dy velocity, or whatever is needed for that affector.
- Create the file `src/game/affect.some-new-affector.ts` with an exported function that implements the `affect` interface as defined in `src/game/game.affect.ts`

```ts
export const BounceState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;
```

- Add the name to the `AffectCategory` enum in `src/game/game.affect.ts`
- The affector function should be implemented based on the needed behavior.
- Update the `updateState` method in the `src/game/game.object.ts` to apply the new affector.

# Notes

- Some affectors update other affectors. Review the target affect for an example of this.
- Some affectors interact with game object properties directly. Review the velocity affector for an example of this.
- Some affectors use game world properties. Review the bounce affector for an example of this.
- The state for the new affector can include other values, such as strength of gravity, xy coordinates, dx dy velocity, or whatever is needed for that affector.
