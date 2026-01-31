import { AffectorCategory } from "./game.affector.js";
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

  isInWorld(): boolean {
    return (
      this.state.x + this.state.radius >= 0 &&
      this.state.x - this.state.radius <= this.game.state.world.width &&
      this.state.y + this.state.radius >= 0 &&
      this.state.y - this.state.radius <= this.game.state.world.height
    );
  }
}

export function randomCircleState(game: Game): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affectors: [],
    x: Math.random() * game.state.world.width,
    y: Math.random() * game.state.world.height,
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function randomMovingCircleState(game: GameState): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affectors: [
      {
        category: AffectorCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}

export function randomBouncingCircleState(game: GameState): CircleState {
  return {
    category: GameObjectCategory.enum.Circle,
    id: crypto.randomUUID(),
    affectors: [
      {
        category: AffectorCategory.enum.Velocity,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
      },
      {
        category: AffectorCategory.enum.Bounce,
      },
    ],
    x: Math.random() * game.world.width,
    y: Math.random() * game.world.height,
    radius: 10 + Math.random() * 20,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  };
}
