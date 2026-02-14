import { DrawCircle } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";

export function drawCircle(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D, draw: DrawCircle): void {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = draw.color;
  ctx.fill();
  ctx.closePath();
}
