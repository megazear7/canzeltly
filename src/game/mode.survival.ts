import { GameState } from "./game.js";
import { GameObjectCategory } from "./type.object.js";
import { RectangleState, CircleState } from "./type.object.js";
import { AffectCategory } from "./game.affect.js";
import {
  randomBouncingCircleState,
  heroCircle,
  randomGravityCircles,
  randomHunterCircleState,
  randomBlockadeCircleState,
  randomVoidCircleState,
  randomGhostCircleState,
} from "./object.circle.js";
import { Player } from "../shared/type.player.js";

export function createSurvivalGame({
  width = 1000,
  height = 1000,
  playerId = crypto.randomUUID(),
  numBouncy = 6,
  numGravity = 0,
  numHunter = 0,
  numBlockade = 0,
  numGreenCircles = 0,
  numVoid = 0,
  numGhost = 0,
  health = 1,
}: {
  width?: number;
  height?: number;
  playerId?: string;
  numBouncy?: number;
  numGravity?: number;
  numHunter?: number;
  numBlockade?: number;
  numGreenCircles?: number;
  numVoid?: number;
  numGhost?: number;
  health?: number;
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
      health: 1,
      damage: 1,
      x: 0,
      y: 0,
      color: "#53744c",
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
    name: "Survival Game",
    id: "survival-game",
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
    mode: "Survival",
    collected: 0,
    totalCollectibles: numGreenCircles > 0 ? numGreenCircles : undefined,
  };

  // Create a circle for the player
  const circle = heroCircle(game, playerId, health);
  circle.id = circleId;
  circle.color = "#0000FF"; // Blue for player circle
  game.layers[1].push(circle);

  // Add green collectible circles
  for (let i = 0; i < numGreenCircles; i++) {
    const radius = 10;
    const collectible = CircleState.parse({
      category: GameObjectCategory.enum.Circle,
      id: crypto.randomUUID(),
      affects: [
        {
          category: AffectCategory.enum.Impermeable,
        },
      ],
      radius,
      mass: radius * radius,
      health: 1,
      damage: 1,
      x: Math.random() * width,
      y: Math.random() * height,
      color: "#00FF00", // Green for collectibles
    });
    game.layers[1].push(collectible);
  }

  // Add initial enemy circles
  for (let i = 0; i < numBouncy; i++) {
    game.layers[1].push(randomBouncingCircleState(game));
  }
  for (let i = 0; i < numGravity; i++) {
    game.layers[1].push(randomGravityCircles(game));
  }
  for (let i = 0; i < numHunter; i++) {
    game.layers[1].push(randomHunterCircleState(game, playerId));
  }
  for (let i = 0; i < numBlockade; i++) {
    game.layers[1].push(randomBlockadeCircleState(game));
  }
  for (let i = 0; i < numVoid; i++) {
    game.layers[1].push(randomVoidCircleState(game));
  }
  for (let i = 0; i < numGhost; i++) {
    game.layers[1].push(randomGhostCircleState(game, playerId));
  }

  return game;
}
