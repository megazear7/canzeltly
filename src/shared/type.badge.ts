import z from "zod";

export const BadgeId = z.string();
export type BadgeId = z.infer<typeof BadgeId>;

export const BadgeCategory = z.enum([
  "CampaignVictory",
  "GamesPlayed",
  "SurvivalTime",
  "GreenCirclesCollected",
  "BadgesCollected",
]);
export type BadgeCategory = z.infer<typeof BadgeCategory>;

export const Badge = z.object({
  id: BadgeId,
  name: z.string(),
  description: z.string(),
  category: BadgeCategory,
  threshold: z.number(), // e.g., 10 for 10 games
  icon: z.string().optional(), // maybe for display
});
export type Badge = z.infer<typeof Badge>;

export const BadgeProgress = z.object({
  badgeId: BadgeId,
  current: z.number(),
  unlocked: z.boolean(),
  unlockedAt: z.number().optional(), // timestamp
});
export type BadgeProgress = z.infer<typeof BadgeProgress>;

// Define all badges
export const BADGES: Badge[] = [
  // Campaign
  {
    id: "campaign-victory",
    name: "Campaign Conqueror",
    description: "Defeat a campaign",
    category: BadgeCategory.enum.CampaignVictory,
    threshold: 1,
  },
  // Games played
  {
    id: "games-played-10",
    name: "Getting Started",
    description: "Play 10 games",
    category: BadgeCategory.enum.GamesPlayed,
    threshold: 10,
  },
  {
    id: "games-played-100",
    name: "Dedicated Player",
    description: "Play 100 games",
    category: BadgeCategory.enum.GamesPlayed,
    threshold: 100,
  },
  {
    id: "games-played-1000",
    name: "Master Gamer",
    description: "Play 1000 games",
    category: BadgeCategory.enum.GamesPlayed,
    threshold: 1000,
  },
  // Survival time (in minutes)
  {
    id: "survival-1-min",
    name: "Survivor",
    description: "Survive for 1 minute in survival mode",
    category: BadgeCategory.enum.SurvivalTime,
    threshold: 1,
  },
  {
    id: "survival-10-min",
    name: "Endurer",
    description: "Survive for 10 minutes in survival mode",
    category: BadgeCategory.enum.SurvivalTime,
    threshold: 10,
  },
  {
    id: "survival-100-min",
    name: "Unstoppable",
    description: "Survive for 100 minutes in survival mode",
    category: BadgeCategory.enum.SurvivalTime,
    threshold: 100,
  },
  {
    id: "survival-1000-min",
    name: "Legend",
    description: "Survive for 1000 minutes in survival mode",
    category: BadgeCategory.enum.SurvivalTime,
    threshold: 1000,
  },
  // Green circles collected
  {
    id: "green-circles-10",
    name: "Collector",
    description: "Collect 10 green circles",
    category: BadgeCategory.enum.GreenCirclesCollected,
    threshold: 10,
  },
  {
    id: "green-circles-100",
    name: "Gatherer",
    description: "Collect 100 green circles",
    category: BadgeCategory.enum.GreenCirclesCollected,
    threshold: 100,
  },
  {
    id: "green-circles-1000",
    name: "Hoarder",
    description: "Collect 1000 green circles",
    category: BadgeCategory.enum.GreenCirclesCollected,
    threshold: 1000,
  },
  // Badges collected
  {
    id: "badges-10",
    name: "Achiever",
    description: "Collect 10 badges",
    category: BadgeCategory.enum.BadgesCollected,
    threshold: 10,
  },
  {
    id: "badges-100",
    name: "Badge Master",
    description: "Collect 100 badges",
    category: BadgeCategory.enum.BadgesCollected,
    threshold: 100,
  },
  {
    id: "badges-1000",
    name: "Badge Legend",
    description: "Collect 1000 badges",
    category: BadgeCategory.enum.BadgesCollected,
    threshold: 1000,
  },
];
