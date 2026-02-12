import z from "zod";
import { BadgeProgress } from "./type.badge.js";

export const Achievements = z.object({
  badges: z.array(BadgeProgress),
  totalGamesPlayed: z.number().default(0),
  totalGreenCirclesCollected: z.number().default(0),
  totalSurvivalTime: z.number().default(0), // in minutes
  campaignsDefeated: z.number().default(0),
});
export type Achievements = z.infer<typeof Achievements>;

export const AchievementsPartial = Achievements.partial();
export type AchievementsPartial = z.infer<typeof AchievementsPartial>;
