import { GameState } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { RectangleState, CircleState } from "./type.object.js";
import { heroCircle, randomBouncingCircleState } from "./object.circle.js";
import { Player } from "../shared/type.player.js";

export function createAdventureGame({
  width = 1000,
  height = 1000,
  playerId = crypto.randomUUID(),
  numCircles = 10,
  gameName = "Adventure Game",
  gameId = "adventure-game",
}: {
  width?: number;
  height?: number;
  playerId?: string;
  numCircles?: number;
  gameName?: string;
  gameId?: string;
} = {}): GameState {
  const circleId = crypto.randomUUID();

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

  const players: Player[] = [
    {
      viewportIndex: 0,
      playerId,
      name: undefined,
      selectedObjects: [circleId],
    },
  ];

  const game: GameState = {
    name: gameName,
    id: gameId,
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
    status: "NotStarted",
    duration: 0,
    mode: "Adventure",
    collected: 0,
    totalCollectibles: numCircles,
  };

  // Create a circle for the player
  const circle = heroCircle(game, playerId);
  circle.id = circleId;
  circle.color = "#0000FF"; // Blue for player circle
  game.layers[1].push(circle);

  // Add green collectible circles
  for (let i = 0; i < numCircles; i++) {
    const collectible: CircleState = {
      category: GameObjectCategory.enum.Circle,
      id: crypto.randomUUID(),
      affects: [],
      radius: 10,
      x: Math.random() * width,
      y: Math.random() * height,
      color: "#00FF00", // Green for collectibles
    };
    game.layers[1].push(collectible);
  }

  // Add red bouncing circles
  for (let i = 0; i < 5; i++) {
    game.layers[1].push(randomBouncingCircleState(game));
  }

  return game;
}
