import z from "zod";
import { Game } from "./game.js";
import { GameObject, GameObjectCategory, GameObjectState } from "./game.object.js";

export const CircleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Circle),
  color: z.string(),
  size: z.number(),
  dx: z.number(),
  dy: z.number(),
});
export type CircleState = z.infer<typeof CircleState>;

export class Circle extends GameObject<CircleState> {
  override state: CircleState;

  constructor(game: Game, state: CircleState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }

  updateState(): void {
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;
  }
}
