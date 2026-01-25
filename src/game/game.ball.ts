import z from "zod";
import { Game } from "./game.js";
import { GameObject } from "./game.object.js";
import { GameObjectCategory } from "./type.game.js";

export const BallState = z.object({
  category: z.literal(GameObjectCategory.enum.ball),
  x: z.number(),
  y: z.number(),
  dx: z.number(),
  dy: z.number(),
});
export type BallState = z.infer<typeof BallState>;

export class Ball extends GameObject<BallState> {
  override state: BallState;

  constructor(game: Game, state: BallState) {
    super(game, state);
    this.game = game;
    this.state = state;
  }

  override update(): void {
    this.state.x += this.state.dx;
    this.state.y += this.state.dy;
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.state.x, this.state.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
