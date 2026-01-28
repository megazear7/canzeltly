import { GameState } from "./game.js";
import { GameObjectCategory } from "./game.object.js";
import { SquareState } from "./object.rectangle.js";
import { CircleState } from "./object.circle.js";

const background: SquareState[] = [
  {
    category: GameObjectCategory.enum.Square,
    width: 1000,
    height: 1000,
    x: 0,
    y: 0,
    color: "#78530d",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Square,
    width: 990,
    height: 990,
    x: 5,
    y: 5,
    color: "#53744c",
    dx: 0,
    dy: 0,
  },
];

const objects: CircleState[] = [];

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    world: {
      width: 1000,
      height: 1000,
    },
    viewport: {
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    },
    layers: [
      [...background], // Background environment layer
      [...objects], // Main objects layer
    ],
  };
}
