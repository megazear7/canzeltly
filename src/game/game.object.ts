import { Game } from "./game.js";
import { GameObjectState } from "./type.game.js";

export abstract class GameObject<T extends GameObjectState> {
  game: Game;
  state: T;

  constructor(game: Game, state: T) {
    this.game = game;
    this.state = state;
  }

  abstract update(): void;

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
