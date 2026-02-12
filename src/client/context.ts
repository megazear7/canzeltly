import { createContext } from "@lit/context";
import z from "zod";
import { LoadingStatus } from "../shared/type.loading.js";
import { AppConfig } from "../shared/type.app.js";
import { GameState } from "../game/game.js";
import { CustomGameMode } from "../shared/type.custom-game-mode.js";
import { Campaign, CampaignInstance } from "../shared/type.campaign.js";
import { Achievements } from "../shared/type.achievement.js";

export const AppContext = z.object({
  app: AppConfig.optional(),
  achievements: Achievements.optional(),
  status: LoadingStatus,
  error: z.string().optional(),
});
export type AppContext = z.infer<typeof AppContext>;
export const appContext = createContext<AppContext>("app");

export const GamesContext = z.object({
  status: LoadingStatus,
  games: z.array(GameState),
});
export type GamesContext = z.infer<typeof GamesContext>;
export const gamesContext = createContext<GamesContext>("games");

export const CustomGameModesContext = z.object({
  status: LoadingStatus,
  modes: z.array(CustomGameMode),
});
export type CustomGameModesContext = z.infer<typeof CustomGameModesContext>;
export const customGameModesContext = createContext<CustomGameModesContext>("customGameModes");

export const CampaignsContext = z.object({
  status: LoadingStatus,
  campaigns: z.array(Campaign),
  activeCampaigns: z.array(CampaignInstance),
});
export type CampaignsContext = z.infer<typeof CampaignsContext>;
export const campaignsContext = createContext<CampaignsContext>("campaigns");
