import z from "zod";

export const RoutePath = z.string();
export type RoutePath = z.infer<typeof RoutePath>;

export const RouteName = z.enum([
  "home",
  "play",
  "create_game",
  "saved_games",
  "game_summary",
  "custom_game_modes",
  "start_campaign",
  "continue_campaign",
  "campaign_games",
  "campaign_upgrade",
  "achievements",
  "not_found",
]);
export type RouteName = z.infer<typeof RouteName>;

export const RouteConfig = z.object({
  name: RouteName,
  path: RoutePath,
});
export type RouteConfig = z.infer<typeof RouteConfig>;
