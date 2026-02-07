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
  loss: z.number(),
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
  x: z.number().nullable(),
  y: z.number().nullable(),
  acceleration: z.number(),
});
export type TargetState = z.infer<typeof TargetState>;

export const TargetObjectState = AffectState.extend({
  category: z.literal(AffectCategory.enum.TargetObject),
  objectId: z.string(),
  acceleration: z.number(),
});
export type TargetObjectState = z.infer<typeof TargetObjectState>;

export const GravityState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Gravity),
  strength: z.number(),
});
export type GravityState = z.infer<typeof GravityState>;

export const AbilityState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Ability),
  acceleration: z.number(),
  maxSpeed: z.number(),
  brakingAcceleration: z.number(),
});
export type AbilityState = z.infer<typeof AbilityState>;

export const GameOverState = AffectState.extend({
  category: z.literal(AffectCategory.enum.GameOver),
  layers: z.array(z.number()),
  playerId: z.uuid(),
});
export type GameOverState = z.infer<typeof GameOverState>;

export const CollectionState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Collection),
});
export type CollectionState = z.infer<typeof CollectionState>;

export const GameOverCollisionState = AffectState.extend({
  category: z.literal(AffectCategory.enum.GameOverCollision),
});
export type GameOverCollisionState = z.infer<typeof GameOverCollisionState>;

export const ImpermeableState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Impermeable),
});
export type ImpermeableState = z.infer<typeof ImpermeableState>;

export const ElasticCollisionState = AffectState.extend({
  category: z.literal(AffectCategory.enum.ElasticCollision),
});
export type ElasticCollisionState = z.infer<typeof ElasticCollisionState>;

export const AnyAffectState = z.union([
  BounceState,
  VelocityState,
  TargetState,
  TargetObjectState,
  GravityState,
  AbilityState,
  GameOverState,
  CollectionState,
  GameOverCollisionState,
  ImpermeableState,
  ElasticCollisionState,
]);
export type AnyAffectState = z.infer<typeof AnyAffectState>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
  id: GameObjectId,
  affects: AnyAffectState.array(),
  radius: z.number(),
  mass: z.number().default(1),
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
