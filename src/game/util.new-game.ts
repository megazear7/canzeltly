import { GameState, GameStatus } from "./game.js";
import { GameMode } from "./type.game.js";
import { GameObjectCategory, DrawCategory, DrawMode } from "./type.object.js";
import { RectangleState } from "./type.object.js";
import { gremlakShip, heroCircle } from "./object.circle.js";
import { Player } from "../shared/type.player.js";

export function newGame({
  width = 1000,
  height = 1000,
  playerId = crypto.randomUUID(),
  drawMode = "graphical",
}: {
  width?: number;
  height?: number;
  playerId?: string;
  drawMode?: "simple" | "graphical";
} = {}): GameState {
  const circleId = crypto.randomUUID();

  const background = [
    RectangleState.parse({
      category: GameObjectCategory.enum.Rectangle,
      id: crypto.randomUUID(),
      affects: [],
      width: width,
      height: height,
      radius: (width + height) / 2,
      mass: width * height,
      x: 0,
      y: 0,
      draw: [
        {
          category: DrawCategory.enum.square,
          mode: DrawMode.enum.simple,
          color: "#000000",
        },
        {
          category: DrawCategory.enum.square,
          mode: DrawMode.enum.graphical,
          color: "#000000",
        },
      ],
    }),
  ];

  const players: Player[] = [
    {
      viewportIndex: 0,
      playerId,
      name: undefined,
      selectedObjects: [circleId],
    },
  ];

  const game: GameState = {
    name: "DefaultGame",
    id: "default-game",
    world: {
      width: width,
      height: height,
    },
    viewports: [
      {
        x: width / 2,
        y: height / 2,
        // Start zoomed out to show the whole world and allow the zoom constraints to take effect
        width: width * 100,
        height: height * 100,
      },
    ],
    controls: {
      scrollSpeed: 10,
    },
    layers: [
      [...background], // Background environment layer
      [], // Main objects layer
    ],
    players,
    status: GameStatus.enum.NotStarted,
    duration: 0,
    mode: GameMode.enum.Survival,
    drawMode,
    collected: 0,
    totalCollectibles: undefined,
    occurrences: [],
  };

  // Create a circle for the player
  const circle = heroCircle(game, playerId);
  circle.id = circleId;
  game.layers[1].push(circle);

  for (let i = 0; i < 6; i++) {
    game.layers[1].push(gremlakShip(game));
  }
  return game;
}
