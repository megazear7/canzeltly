import z from "zod";
import { BadgeId } from "../shared/type.badge.js";

export const BadgeUnlockedEventName = z.literal("BadgeUnlocked");
export type BadgeUnlockedEventName = z.infer<typeof BadgeUnlockedEventName>;

export const BadgeUnlockedEventDetail = z.object({
  badgeId: BadgeId,
  unlockedAt: z.number(),
});
export type BadgeUnlockedEventDetail = z.infer<typeof BadgeUnlockedEventDetail>;

export const BadgeUnlockedEventData = z.object({
  name: BadgeUnlockedEventName,
  detail: BadgeUnlockedEventDetail,
});
export type BadgeUnlockedEventData = z.infer<typeof BadgeUnlockedEventData>;

export const BadgeUnlockedEvent = (detail: BadgeUnlockedEventDetail): BadgeUnlockedEventData => ({
  name: BadgeUnlockedEventName.value,
  detail,
});
