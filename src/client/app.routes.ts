import { RouteName } from "../shared/type.routes.js";

export const routes = [
  {
    name: RouteName.enum.home,
    path: "/",
  },
  {
    name: RouteName.enum.play,
    path: "/play/:id",
  },
];
