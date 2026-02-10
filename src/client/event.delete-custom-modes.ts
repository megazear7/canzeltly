import z from "zod";

export const DeleteCustomModesEventName = z.literal("DeleteCustomModes");
export type DeleteCustomModesEventName = z.infer<typeof DeleteCustomModesEventName>;

export const DeleteCustomModesEventDetail = z.object({
  names: z.array(z.string()),
});
export type DeleteCustomModesEventDetail = z.infer<typeof DeleteCustomModesEventDetail>;

export const DeleteCustomModesEventData = z.object({
  name: DeleteCustomModesEventName,
  detail: DeleteCustomModesEventDetail,
});
export type DeleteCustomModesEventData = z.infer<typeof DeleteCustomModesEventData>;

export const DeleteCustomModesEvent = (names: string[]): DeleteCustomModesEventData => ({
  name: DeleteCustomModesEventName.value,
  detail: { names },
});
