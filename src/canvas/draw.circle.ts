import { DrawCircle } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";

export function drawCircle(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  if (!obj.draw) {
    // Legacy object without draw property
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fillStyle = (obj as any).color || "#ff0000";
    ctx.fill();
    ctx.closePath();
    return;
  }
  const draw = obj.draw as DrawCircle;
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = draw.color;
  ctx.fill();
  ctx.closePath();
}
