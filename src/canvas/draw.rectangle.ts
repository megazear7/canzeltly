import { DrawSquare } from "../game/type.object.js";
import { AnyGameObjectState, RectangleState } from "../game/type.object.js";

export function drawSquare(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D, draw: DrawSquare): void {
  const rectangle = obj as RectangleState;
  ctx.fillStyle = draw.color;
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}
