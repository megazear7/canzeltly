import z from "zod";

export const RenameGameEventName = z.literal("RenameGame");
export type RenameGameEventName = z.infer<typeof RenameGameEventName>;

export const RenameGameEventDetail = z.object({
  oldId: z.string(),
  newName: z.string(),
});
export type RenameGameEventDetail = z.infer<typeof RenameGameEventDetail>;

export const RenameGameEventData = z.object({
  name: RenameGameEventName,
  detail: RenameGameEventDetail,
});
export type RenameGameEventData = z.infer<typeof RenameGameEventData>;

export const RenameGameEvent = (oldId: string, newName: string): RenameGameEventData => ({
  name: RenameGameEventName.value,
  detail: { oldId, newName },
});
