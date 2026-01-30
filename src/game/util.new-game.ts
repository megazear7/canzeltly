import { GameState } from "./game.js";
import { GameObjectCategory } from "./game.object.js";
import { RectangleState } from "./object.rectangle.js";
import { CircleState } from "./object.circle.js";

const background: RectangleState[] = [
  {
    category: GameObjectCategory.enum.Rectangle,
    width: 1000,
    height: 1000,
    x: 0,
    y: 0,
    color: "#78530d",
    dx: 0,
    dy: 0,
  },
  {
    category: GameObjectCategory.enum.Rectangle,
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
      x: 500,
      y: 500,
      width: 1000,
      height: 1000,
    },
    controls: {
      scrollSpeed: 10,
    },
    layers: [
      [...background], // Background environment layer
      [...objects], // Main objects layer
    ],
  };
}
