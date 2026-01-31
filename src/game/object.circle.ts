import { Game } from "./game.js";
import { GameObject } from "./game.object.js";
import { CircleState } from "./type.object.js";

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
