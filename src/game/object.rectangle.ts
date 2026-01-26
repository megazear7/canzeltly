import z from "zod";
import { Game } from "./game.js";
import { GameObject, GameObjectCategory, GameObjectState } from "./game.object.js";

export const SquareState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Square),
  color: z.string(),
  width: z.number(),
  height: z.number(),
  dx: z.number(),
  dy: z.number(),
});
export type SquareState = z.infer<typeof SquareState>;

export class Square extends GameObject<SquareState> {
  override state: SquareState;

  constructor(game: Game, state: SquareState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }

  updateState(): void {
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;
  }
}
