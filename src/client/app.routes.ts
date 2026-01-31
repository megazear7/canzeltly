import { RouteName } from "../shared/type.routes.js";

export const routes = [
  {
    name: RouteName.enum.home,
    path: "/",
  },
  {
    name: RouteName.enum.play,
    path: "/play/game/:gameId/player/:playerId",
  },
  {
    name: RouteName.enum.create_game,
    path: "/create-game",
  },
  {
    name: RouteName.enum.saved_games,
    path: "/saved-games",
  },
];
