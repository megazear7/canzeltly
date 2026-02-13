import z from "zod";

export const ProfileCreatedEventName = z.literal("profile-created");
export type ProfileCreatedEventName = z.infer<typeof ProfileCreatedEventName>;

export const ProfileCreatedEventDetail = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
});
export type ProfileCreatedEventDetail = z.infer<typeof ProfileCreatedEventDetail>;

export const ProfileCreatedEvent = z.object({
  name: ProfileCreatedEventName,
  detail: ProfileCreatedEventDetail,
});
export type ProfileCreatedEvent = z.infer<typeof ProfileCreatedEvent>;

export const dispatchProfileCreatedEvent = (element: HTMLElement, detail: ProfileCreatedEventDetail): void => {
  element.dispatchEvent(
    new CustomEvent(ProfileCreatedEventName.value, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
};
