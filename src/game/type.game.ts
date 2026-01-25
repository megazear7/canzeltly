import z from "zod";

export const GameName = z.string().min(1);
export type GameName = z.infer<typeof GameName>;

export const GameObjectCategory = z.enum(["Circle", "Unknown"]);
export type GameObjectCategory = z.infer<typeof GameObjectCategory>;
