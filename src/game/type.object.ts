import z from "zod";
import { AffectCategory } from "./game.affect.js";

export const GameObjectCategory = z.enum(["Circle", "Rectangle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectLabel = z.enum(["Collectable"]);
export type GameObjectLabel = z.infer<typeof GameObjectLabel>;

export const GameObjectId = z.uuid();
export type GameObjectId = z.infer<typeof GameObjectId>;

export const DrawCategory = z.enum(["circle", "square", "image", "ship"]);
export type DrawCategory = z.infer<typeof DrawCategory>;

export const DrawMode = z.enum(["simple", "graphical"]);
export type DrawMode = z.infer<typeof DrawMode>;

export const DrawState = z.object({
  category: DrawCategory,
  mode: DrawMode,
});
export type DrawState = z.infer<typeof DrawState>;

export const DrawCircle = DrawState.extend({
  category: z.literal(DrawCategory.enum.circle),
  color: z.string(),
});
export type DrawCircle = z.infer<typeof DrawCircle>;

export const DrawSquare = DrawState.extend({
  category: z.literal(DrawCategory.enum.square),
  color: z.string(),
});
export type DrawSquare = z.infer<typeof DrawSquare>;

export const DrawImage = DrawState.extend({
  category: z.literal(DrawCategory.enum.image),
  image: z.string(),
});
export type DrawImage = z.infer<typeof DrawImage>;

export const DrawShip = DrawState.extend({
  category: z.literal(DrawCategory.enum.ship),
  noAccelerationImage: z.string(),
  acceleratingUpImage: z.string(),
  acceleratingDownImage: z.string(),
  acceleratingLeftImage: z.string(),
  acceleratingRightImage: z.string(),
});
export type DrawShip = z.infer<typeof DrawShip>;

export const AnyDrawState = z.union([DrawCircle, DrawSquare, DrawImage, DrawShip]);
export type AnyDrawState = z.infer<typeof AnyDrawState>;

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
  frozenUntil: z.number().optional(),
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

export const HealthState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Health),
  health: z.number(),
  maxHealth: z.number(),
  immuneUntil: z.number().optional(),
});
export type HealthState = z.infer<typeof HealthState>;

export const AbilityState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Ability),
  acceleration: z.number(),
  maxSpeed: z.number(),
  brakingAcceleration: z.number(),
  damage: z.number().default(0),
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

export const OverlappingDamageState = AffectState.extend({
  category: z.literal(AffectCategory.enum.OverlappingDamage),
  damage: z.number().default(0),
  attackSpeed: z.number(),
  lastAttack: z.number().default(0),
  makesAttacks: z.boolean(),
  receivesAttacks: z.boolean(),
});
export type OverlappingDamageState = z.infer<typeof OverlappingDamageState>;

export const ElasticCollisionState = AffectState.extend({
  category: z.literal(AffectCategory.enum.ElasticCollision),
  damage: z.number().default(0),
  attackSpeed: z.number(),
  lastAttack: z.number().default(0),
  makesAttacks: z.boolean(),
  receivesAttacks: z.boolean(),
});
export type ElasticCollisionState = z.infer<typeof ElasticCollisionState>;

export const CollectableState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Collectable),
  type: z.enum(["Food", "Shield", "Ice"]),
});
export type CollectableState = z.infer<typeof CollectableState>;

export const CollectorState = AffectState.extend({
  category: z.literal(AffectCategory.enum.Collector),
  shieldUntil: z.number().optional(),
  iceUntil: z.number().optional(),
});
export type CollectorState = z.infer<typeof CollectorState>;

export const AnyAffectState = z.union([
  BounceState,
  VelocityState,
  TargetState,
  TargetObjectState,
  GravityState,
  HealthState,
  AbilityState,
  GameOverState,
  CollectionState,
  GameOverCollisionState,
  ImpermeableState,
  OverlappingDamageState,
  ElasticCollisionState,
  CollectableState,
  CollectorState,
]);
export type AnyAffectState = z.infer<typeof AnyAffectState>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
  id: GameObjectId,
  affects: AnyAffectState.array(),
  labels: GameObjectLabel.array().default([]),
  radius: z.number(),
  mass: z.number().default(1),
  x: z.number(),
  y: z.number(),
  draw: z.array(AnyDrawState).optional(),
});
export type GameObjectState = z.infer<typeof GameObjectState>;

export const CircleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Circle),
  draw: z.array(AnyDrawState).optional(),
});
export type CircleState = z.infer<typeof CircleState>;

export const RectangleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Rectangle),
  draw: z.array(AnyDrawState).optional(),
  width: z.number(),
  height: z.number(),
});
export type RectangleState = z.infer<typeof RectangleState>;

export const UnknownState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Unknown),
});
export type UnknownState = z.infer<typeof UnknownState>;

export const AnyGameObjectState = CircleState.or(RectangleState).or(UnknownState);
export type AnyGameObjectState = z.infer<typeof AnyGameObjectState>;
