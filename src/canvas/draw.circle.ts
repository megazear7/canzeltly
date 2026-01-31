import { CircleState } from "../game/object.circle.js";
import { AnyGameObjectState } from "../game/type.game.js";

export function drawCircle(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  const circle = CircleState.parse(obj);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}
