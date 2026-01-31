import z from "zod";

export const PlayerId = z.string().uuid();
export type PlayerId = z.infer<typeof PlayerId>;

export const Player = z.object({
  viewportIndex: z.number().int().min(0),
  playerId: PlayerId,
  name: z.string().optional(),
  selectedObjects: z.array(z.string()),
});
export type Player = z.infer<typeof Player>;
