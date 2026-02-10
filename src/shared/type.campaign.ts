import z from "zod";
import { CustomGameMode } from "./type.custom-game-mode.js";

export const CampaignTextObject = z.object({
  type: z.literal("text"),
  text: z.string(),
});
export type CampaignTextObject = z.infer<typeof CampaignTextObject>;

export const CampaignIntro = CampaignTextObject;
export type CampaignIntro = z.infer<typeof CampaignIntro>;

export const CampaignVictory = CampaignTextObject;
export type CampaignVictory = z.infer<typeof CampaignVictory>;

export const CampaignDefeat = CampaignTextObject;
export type CampaignDefeat = z.infer<typeof CampaignDefeat>;

export const HeroStats = z.object({
  health: z.number().default(1),
  maxSpeed: z.number().default(5),
  acceleration: z.number().default(0.5),
});
export type HeroStats = z.infer<typeof HeroStats>;

export const StatUpgradeOption = z.enum(["health", "maxSpeed", "acceleration"]);
export type StatUpgradeOption = z.infer<typeof StatUpgradeOption>;

export const CampaignGameUpgrades = z.object({
  options: z.array(StatUpgradeOption),
  numSelections: z.number().default(1),
});
export type CampaignGameUpgrades = z.infer<typeof CampaignGameUpgrades>;

export const CampaignGame = z.object({
  name: z.string(),
  mode: CustomGameMode,
  intro: CampaignIntro,
  victory: CampaignVictory,
  defeat: CampaignDefeat,
  upgrades: CampaignGameUpgrades.optional(),
});
export type CampaignGame = z.infer<typeof CampaignGame>;

export const Campaign = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  games: z.array(CampaignGame),
});
export type Campaign = z.infer<typeof Campaign>;

export const CampaignInstance = z.object({
  campaignSlug: z.string(),
  currentGameIndex: z.number().default(0),
  completedGameIndexes: z.array(z.number()).default([]),
  heroStats: HeroStats,
  startedAt: z.number(),
});
export type CampaignInstance = z.infer<typeof CampaignInstance>;
