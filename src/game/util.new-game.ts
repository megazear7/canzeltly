import { GameState } from "./game.js";
import { GameObjectCategory } from "./game.object.js";
import { SquareState } from "./object.rectangle.js";

const background: SquareState[] = [
  {
    category: GameObjectCategory.enum.Square,
    width: 600,
    height: 300,
    x: 0,
    y: 0,
    color: "#194adc",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Square,
    width: 580,
    height: 280,
    x: 10,
    y: 10,
    color: "#90ee90",
    dx: 0,
    dy: 0,
  },
];

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    world: {
      width: 600,
      height: 300,
    },
    viewport: {
      x: 0,
      y: 0,
      width: 600,
      height: 300,
    },
    layers: [
      [...background], // Background environment layer
      [], // Main objects layer
    ],
  };
}
