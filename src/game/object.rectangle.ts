import z from "zod";
import { Game } from "./game.js";
import { GameObject, GameObjectCategory, GameObjectState } from "./game.object.js";

export const RectangleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Rectangle),
  color: z.string(),
  width: z.number(),
  height: z.number(),
  dx: z.number(),
  dy: z.number(),
});
export type RectangleState = z.infer<typeof RectangleState>;

export class Rectangle extends GameObject<RectangleState> {
  override state: RectangleState;

  constructor(game: Game, state: RectangleState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }

  updateState(): void {
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;
  }

  isInWorld(): boolean {
    return (
      this.state.x + this.state.width >= 0 &&
      this.state.x <= this.game.state.world.width &&
      this.state.y + this.state.height >= 0 &&
      this.state.y <= this.game.state.world.height
    );
  }
}
