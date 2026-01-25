import { Game } from "../game/game.js";
import { CircleState } from "../game/game.circle.js";
import { GameObjectState } from "../game/game.object.js";

export function drawCircle(game: Game, obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  const circle = CircleState.parse(obj);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}
