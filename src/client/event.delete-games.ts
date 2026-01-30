import z from "zod";

export const DeleteGamesEventName = z.literal("DeleteGames");
export type DeleteGamesEventName = z.infer<typeof DeleteGamesEventName>;

export const DeleteGamesEventDetail = z.object({
  ids: z.array(z.string()),
});
export type DeleteGamesEventDetail = z.infer<typeof DeleteGamesEventDetail>;

export const DeleteGamesEventData = z.object({
  name: DeleteGamesEventName,
  detail: DeleteGamesEventDetail,
});
export type DeleteGamesEventData = z.infer<typeof DeleteGamesEventData>;

export const DeleteGamesEvent = (ids: string[]): DeleteGamesEventData => ({
  name: DeleteGamesEventName.value,
  detail: { ids },
});
