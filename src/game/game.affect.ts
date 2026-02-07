import z from "zod";
import { GameObject } from "./game.object.js";
import { AnyGameObjectState } from "./type.object.js";

export const AffectCategory = z.enum([
  "Bounce",
  "Velocity",
  "Target",
  "TargetObject",
  "Gravity",
  "Ability",
  "GameOver",
  "Collection",
  "GameOverCollision",
  "Impermeable",
  "ElasticCollision",
]);
export type AffectCategory = z.infer<typeof AffectCategory>;

export const AffectState = z.object({
  category: AffectCategory,
});
export type AffectState = z.infer<typeof AffectState>;

export interface affect {
  (obj: GameObject<AnyGameObjectState>): void;
}
