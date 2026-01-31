import z from "zod";
import { AffectCategory } from "./game.affect.js";

export const GameObjectCategory = z.enum(["Circle", "Rectangle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectId = z.uuid();
export type GameObjectId = z.infer<typeof GameObjectId>;

export const AffectState = z.object({
  category: AffectCategory.enum.Bounce,
});
export type AffectState = z.infer<typeof AffectState>;

export const BounceState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Bounce),
});
export type BounceState = z.infer<typeof BounceState>;

export const VelocityState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Velocity),
  dx: z.number(),
  dy: z.number(),
});
export type VelocityState = z.infer<typeof VelocityState>;

export const TargetState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Target),
  x: z.number(),
  y: z.number(),
  acceleration: z.number(),
});
export type TargetState = z.infer<typeof TargetState>;

export const AnyAffectState = z.union([BounceState, VelocityState, TargetState]);
export type AnyAffectState = z.infer<typeof AnyAffectState>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
  id: GameObjectId,
  affects: AnyAffectState.array(),
  radius: z.number(),
  x: z.number(),
  y: z.number(),
});
export type GameObjectState = z.infer<typeof GameObjectState>;

export const CircleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Circle),
  color: z.string(),
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
