import { GameState } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { RectangleState } from "./type.object.js";
import { randomBouncingCircleState } from "./object.circle.js";

export function newGame(width: number = 1000, height: number = 1000): GameState {
  const background: RectangleState[] = [
    {
      category: GameObjectCategory.enum.Rectangle,
      id: crypto.randomUUID(),
      affects: [],
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
      x: width / 2,
      y: height / 2,
      // Start zoomed out to show the whole world and allow the zoom constraints to take effect
      width: width * 100,
      height: height * 100,
    },
    controls: {
      scrollSpeed: 10,
    },
    layers: [
      [...background], // Background environment layer
      [], // Main objects layer
    ],
  };
  for (let i = 0; i < 5; i++) {
    game.layers[1].push(randomBouncingCircleState(game));
  }
  return game;
}
