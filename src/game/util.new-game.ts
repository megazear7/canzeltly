import { GameState } from "./game";

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    world: {
      width: 4000,
      height: 4000,
    },
    viewport: {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
    },
    objects: [],
  };
}
