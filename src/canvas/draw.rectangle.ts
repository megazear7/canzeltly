import { DrawSquare } from "../game/type.object.js";
import { AnyGameObjectState, RectangleState } from "../game/type.object.js";

export function drawSquare(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  if (!obj.draw) {
    // Legacy object without draw property
    const rect = obj as any;
    ctx.fillStyle = rect.color || "#ff0000";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    return;
  }
  const rectangle = obj as RectangleState;
  const draw = rectangle.draw as DrawSquare;
  ctx.fillStyle = draw.color;
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
