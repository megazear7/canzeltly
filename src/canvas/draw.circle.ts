import { CircleState } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";

export function drawCircle(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  const circle = obj as CircleState;
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}
