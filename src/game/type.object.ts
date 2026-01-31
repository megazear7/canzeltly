import z from "zod";
import { AffectorCategory } from "./game.affector.js";

export const GameObjectCategory = z.enum(["Circle", "Rectangle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectId = z.uuid();
export type GameObjectId = z.infer<typeof GameObjectId>;

export const BounceState = z.object({
  category: z.literal(AffectorCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;

export const VelocityState = z.object({
  category: z.literal(AffectorCategory.enum.Velocity),
});
export type VelocityState = z.infer<typeof VelocityState>;

export const AnyAffectorState = z.union([BounceState, VelocityState]);
export type AnyAffectorState = z.infer<typeof AnyAffectorState>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
  id: GameObjectId,
  affectors: AnyAffectorState.array(),
  x: z.number(),
  y: z.number(),
  dx: z.number(),
  dy: z.number(),
});
export type GameObjectState = z.infer<typeof GameObjectState>;

export const CircleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Circle),
  color: z.string(),
  radius: z.number(),
});
export type CircleState = z.infer<typeof CircleState>;

export const RectangleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Rectangle),
  color: z.string(),
  width: z.number(),
  height: z.number(),
});
export type RectangleState = z.infer<typeof RectangleState>;

export const AnyGameObjectState = CircleState.or(RectangleState);
export type AnyGameObjectState = z.infer<typeof AnyGameObjectState>;
