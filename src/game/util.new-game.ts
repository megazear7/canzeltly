import { GameState } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { RectangleState } from "./type.object.js";
import { randomBouncingCircleState } from "./object.circle.js";

export function newGame(width: number = 1000, height: number = 1000): GameState {
  const background: RectangleState[] = [
    {
      category: GameObjectCategory.enum.Rectangle,
      id: crypto.randomUUID(),
      affectors: [],
      width: width,
      height: height,
      radius: (width + height) / 2,
      x: 0,
      y: 0,
      color: "#53744c",
    },
  ];
  const game: GameState = {
    name: "DefaultGame",
    id: "default-game",
    world: {
      width: width,
      height: height,
    },
    viewport: {
      x: 0,
      y: 0,
      width: width,
      height: height,
    },
    controls: {
      scrollSpeed: 10,
    },
    layers: [
      [...background], // Background environment layer
      [], // Main objects layer
    ],
  };
  for (let i = 0; i < 10; i++) {
    game.layers[1].push(randomBouncingCircleState(game));
  }
  return game;
}
