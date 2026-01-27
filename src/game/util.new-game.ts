import { GameState } from "./game.js";
import { GameObjectCategory } from "./game.object.js";
import { SquareState } from "./object.rectangle.js";
import { CircleState } from "./object.circle.js";

const background: SquareState[] = [
  {
    category: GameObjectCategory.enum.Square,
    width: 600,
    height: 600,
    x: 0,
    y: 0,
    color: "#194adc",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Square,
    width: 580,
    height: 580,
    x: 10,
    y: 10,
    color: "#90ee90",
    dx: 0,
    dy: 0,
  },
];

const objects: CircleState[] = [
  {
    category: GameObjectCategory.enum.Circle,
    size: 10,
    x: 0,
    y: 0,
    color: "#ff0000",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Circle,
    size: 10,
    x: 600,
    y: 0,
    color: "#ff0000",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Circle,
    size: 10,
    x: 0,
    y: 600,
    color: "#ff0000",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Circle,
    size: 10,
    x: 600,
    y: 600,
    color: "#ff0000",
    dx: 0,
    dy: 0,
  },
];

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    world: {
      width: 600,
      height: 600,
    },
    viewport: {
      x: 100,
      y: 100,
      width: 800,
      height: 800,
    },
    layers: [
      [...background], // Background environment layer
      [...objects], // Main objects layer
    ],
  };
}
