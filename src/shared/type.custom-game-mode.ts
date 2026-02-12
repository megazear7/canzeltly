import z from "zod";
import { GameMode } from "../game/type.game.js";

export const CustomGameMode = z.object({
  name: z.string(),
  worldWidth: z.number(),
  worldHeight: z.number(),
  numCircles: z.number(),
  mode: GameMode,
  timeLimit: z.number(),
  health: z.number(),
  numGreenCircles: z.number(),
  numBouncy: z.number(),
  numGravity: z.number(),
  numHunter: z.number(),
  numBlockade: z.number(),
  numVoid: z.number(),
  numGhost: z.number(),
  spawnFoodChance: z.number().optional(),
  spawnShieldChance: z.number().optional(),
  spawnIceChance: z.number().optional(),
});
export type CustomGameMode = z.infer<typeof CustomGameMode>;
