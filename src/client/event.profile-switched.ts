import z from "zod";
import { ProfileId } from "../shared/type.profile.js";

export const ProfileSwitchedEventName = z.literal("profile-switched");
export type ProfileSwitchedEventName = z.infer<typeof ProfileSwitchedEventName>;

export const ProfileSwitchedEventDetail = z.object({
  profileId: ProfileId,
});
export type ProfileSwitchedEventDetail = z.infer<typeof ProfileSwitchedEventDetail>;

export const ProfileSwitchedEvent = z.object({
  name: ProfileSwitchedEventName,
  detail: ProfileSwitchedEventDetail,
});
export type ProfileSwitchedEvent = z.infer<typeof ProfileSwitchedEvent>;

export function dispatchProfileSwitchedEvent(element: HTMLElement, event: ProfileSwitchedEvent): void {
  element.dispatchEvent(
    new CustomEvent(ProfileSwitchedEventName.value, {
      detail: event,
      bubbles: true,
      composed: true,
    }),
  );
}
