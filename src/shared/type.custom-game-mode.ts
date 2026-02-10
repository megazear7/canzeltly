import z from "zod";

export const CustomGameMode = z.object({
  name: z.string(),
  worldWidth: z.number(),
  worldHeight: z.number(),
  numCircles: z.number(),
  mode: z.string(), // "Survival", "Adventure", "Race"
  timeLimit: z.number(),
  health: z.number(),
  numGreenCircles: z.number(),
  numBouncy: z.number(),
  numGravity: z.number(),
  numHunter: z.number(),
  numBlockade: z.number(),
  numVoid: z.number(),
  numGhost: z.number(),
});
export type CustomGameMode = z.infer<typeof CustomGameMode>;
