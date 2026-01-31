import { GameState } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { RectangleState } from "./type.object.js";
import { AnyGameObjectState } from "./type.object.js";

const background: RectangleState[] = [
  {
    category: GameObjectCategory.enum.Rectangle,
    id: crypto.randomUUID(),
    affectors: [],
    width: 1000,
    height: 1000,
    x: 0,
    y: 0,
    color: "#53744c",
    dx: 0,
    dy: 0,
  },
];

const objects: AnyGameObjectState[] = [];

export function newGame(): GameState {
  return {
    name: "DefaultGame",
    id: "default-game",
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
