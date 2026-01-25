import z from "zod";

export const GameName = z.string().min(1);
export type GameName = z.infer<typeof GameName>;

export const GameObjectCategory = z.enum(["ball", "unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;

export const GameObjectState = z.object({
  category: GameObjectCategory,
});
export type GameObjectState = z.infer<typeof GameObjectState>;
