import z from "zod";
import { Circle, CircleState } from "./object.circle.js";
import { Rectangle, RectangleState } from "./object.rectangle.js";

export const GameName = z.string().min(1);
export type GameName = z.infer<typeof GameName>;

export const GameId = z.string().regex(/^[a-z0-9-]+$/).default("default-game");
export type GameId = z.infer<typeof GameId>;

export const AnyGameObjectState = CircleState.or(RectangleState);
export type AnyGameObjectState = z.infer<typeof AnyGameObjectState>;

export const AnyGameObject = z.union([z.instanceof(Circle), z.instanceof(Rectangle)]);
export type AnyGameObject = z.infer<typeof AnyGameObject>;

export const GameObjectLayer = z.array(AnyGameObjectState);
export type GameObjectLayer = z.infer<typeof GameObjectLayer>;
