import z from "zod";
import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";

export const AffectCategory = z.enum([
  "Bounce",
  "Velocity",
  "Target",
  "TargetObject",
  "Gravity",
  "Health",
  "Ability",
  "GameOver",
  "Collection",
  "GameOverCollision",
  "Impermeable",
  "OverlappingDamage",
  "ElasticCollision",
  "Collectable",
  "Collector",
]);
export type AffectCategory = z.infer<typeof AffectCategory>;

export const OccurrenceCategory = z.enum(["SpawnFood", "SpawnShield", "SpawnIce"]);
export type OccurrenceCategory = z.infer<typeof OccurrenceCategory>;

export const OccurrenceState = z.object({
  category: OccurrenceCategory,
  chance: z.number(),
});
export type OccurrenceState = z.infer<typeof OccurrenceState>;

export const AffectState = z.object({
  category: AffectCategory,
});
export type AffectState = z.infer<typeof AffectState>;

export interface affect {
  <T extends GameObjectState>(obj: GameObject<T>): void;
}
