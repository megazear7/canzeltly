import z from "zod";
import { GameObject } from "./game.object.js";
import { GameObjectState } from "./type.object.js";

export const AffectorCategory = z.enum(["Bounce", "Velocity", "Target"]);
export type AffectorCategory = z.infer<typeof AffectorCategory>;

export const AffectorState = z.object({
  category: AffectorCategory,
});
export type AffectorState = z.infer<typeof AffectorState>;

export interface affector {
  (obj: GameObject<GameObjectState>): void;
}
