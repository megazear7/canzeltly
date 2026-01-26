import { GameState } from "./game";
import { GameObjectCategory } from "./game.object";
import { SquareState } from "./object.square";

const background: SquareState = {
  category: GameObjectCategory.enum.Square,
  width: 250,
  height: 250,
  x: 0,
  y: 0,
  color: "#90ee90",
  dx: 0,
  dy: 0,
};

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    world: {
      width: 500,
      height: 500,
    },
    viewport: {
      x: 0,
      y: 0,
      width: 500,
      height: 500,
    },
    layers: [
      [background], // Background environment layer
      [], // Main objects layer
    ],
  };
}
