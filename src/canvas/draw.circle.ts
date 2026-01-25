import { CircleState } from "../game/object.circle.js";
import { GameObjectState } from "../game/game.object.js";

export function drawCircle(obj: GameObjectState, ctx: CanvasRenderingContext2D): void {
  const circle = CircleState.parse(obj);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}
