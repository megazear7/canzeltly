import { AffectCategory } from "./game.affect.js";
import { Game, GameState } from "./game.js";
import { GameObject } from "./game.object.js";
import { CircleState, GameObjectCategory } from "./type.object.js";

export class Circle extends GameObject<CircleState> {
  override state: CircleState;

  constructor(game: Game, state: CircleState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }
}

export function randomCircleState(game: Game): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [],
    x: Math.random() * game.state.world.width,
    y: Math.random() * (game.state.world.height / 2),
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function randomMovingCircleState(game: GameState): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
      },
      {
        category: AffectCategory.enum.Target,
        x: Math.random() * game.world.width,
        y: Math.random() * game.world.height,
        acceleration: 0.2 + Math.random() * 0.1,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function randomBouncingCircleState(game: GameState): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.25,
        maxSpeed: 5.0,
        brakingAcceleration: 0.075,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function randomGravityCircles(game: GameState): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.Gravity,
        strength: 0.1 + Math.random() * 0.1,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * (game.world.height / 2),
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function heroCircle(game: GameState, playerId: string): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affects: [
      {
        category: AffectCategory.enum.GameOver,
        layers: [1],
        playerId: playerId,
      },
      {
        category: AffectCategory.enum.Velocity,
        dx: 0,
        dy: 0,
      },
      {
        category: AffectCategory.enum.Bounce,
        loss: 0,
      },
      {
        category: AffectCategory.enum.Ability,
        acceleration: 0.25,
        maxSpeed: 5.0,
        brakingAcceleration: 0.075,
      },
    ],
    x: Math.random() * game.world.width,
    y: (0.5 + Math.random() * 0.5) * game.world.height,
    radius: 15,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  };
}
