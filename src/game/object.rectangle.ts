import { Game } from "./game.js";
import { GameObject } from "./game.object.js";
import { RectangleState } from "./type.object.js";

export class Rectangle extends GameObject<RectangleState> {
  override state: RectangleState;

  constructor(game: Game, state: RectangleState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }

  override isInWorld(): boolean {
    return (
      this.state.x + this.state.width >= 0 &&
      this.state.x <= this.game.state.world.width &&
      this.state.y + this.state.height >= 0 &&
      this.state.y <= this.game.state.world.height
    );
  }
}
