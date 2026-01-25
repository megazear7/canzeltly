import z from "zod";
import { Game } from "./game.js";
import { GameObject, GameObjectState } from "./game.object.js";
import { GameObjectCategory } from "./type.game.js";

export const CircleState = GameObjectState.extend({
  category: z.literal(GameObjectCategory.enum.Circle),
  color: z.string(),
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

  override checkForDestroy(): void {
    const outsideX = this.state.x < 0 || this.state.x > this.game.state.world.width;
    const outsideY = this.state.y < 0 || this.state.y > this.game.state.world.height;
    if (outsideX || outsideY) {
      const index = this.game.objects.indexOf(this);
      if (index > -1) {
        this.game.objects.splice(index, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.state.x, this.state.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
