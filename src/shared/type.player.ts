import z from "zod";

export const PlayerId = z.string().uuid();
export type PlayerId = z.infer<typeof PlayerId>;

export const Victory = z.enum(["Win", "Lose"]);
export type Victory = z.infer<typeof Victory>;

export const Player = z.object({
  viewportIndex: z.number().int().min(0),
  playerId: PlayerId,
  name: z.string().optional(),
  selectedObjects: z.array(z.string()),
  victory: Victory.optional(),
});
export type Player = z.infer<typeof Player>;
