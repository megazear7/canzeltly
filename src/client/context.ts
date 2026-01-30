import { createContext } from "@lit/context";
import z from "zod";
import { LoadingStatus } from "../shared/type.loading.js";
import { AppConfig } from "../shared/type.app.js";
import { GameState } from "../game/game.js";

export const AppContext = z.object({
  app: AppConfig.optional(),
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
