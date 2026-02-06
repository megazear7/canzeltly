import z from "zod";
import { Circle } from "./object.circle.js";
import { Rectangle } from "./object.rectangle.js";
import { AnyGameObjectState } from "./type.object.js";

export const GameName = z.string().min(1);
export type GameName = z.infer<typeof GameName>;

export const GameId = z
  .string()
  .regex(/^[a-z0-9-]+$/)
  .default("default-game");
export type GameId = z.infer<typeof GameId>;

export const GameMode = z.enum(["Survival", "Adventure", "Race"]);
export type GameMode = z.infer<typeof GameMode>;

export const AnyGameObject = z.union([z.instanceof(Circle), z.instanceof(Rectangle)]);
export type AnyGameObject = z.infer<typeof AnyGameObject>;

export const GameObjectLayer = z.array(AnyGameObjectState);
export type GameObjectLayer = z.infer<typeof GameObjectLayer>;
