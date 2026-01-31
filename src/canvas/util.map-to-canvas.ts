import { Viewport } from "../game/game.js";
import { GameObjectCategory } from "../game/type.object.js";
import { CircleState } from "../game/type.object.js";
import { RectangleState } from "../game/type.object.js";
import { AnyGameObjectState } from "../game/type.object.js";

export function mapToCanvas(
  viewport: Viewport,
  canvas: HTMLCanvasElement,
  obj: AnyGameObjectState,
): AnyGameObjectState {
  const scaleX = canvas.width / viewport.width;
  const scaleY = canvas.height / viewport.height;
  const viewportCenterX = (viewport.x - viewport.width / 2) * scaleX;
  const viewportCenterY = (viewport.y - viewport.height / 2) * scaleY;
  const x = obj.x * scaleX - viewportCenterX;
  const y = obj.y * scaleY - viewportCenterY;

  if (obj.category === GameObjectCategory.enum.Circle) {
    const circle = obj as CircleState;
    const size = circle.radius * scaleX; // Use scaleX for radius
    return {
      ...obj,
      x,
      y,
      radius: size,
    };
  } else if (obj.category === GameObjectCategory.enum.Rectangle) {
    const rectangle = obj as RectangleState;
    const width = rectangle.width * scaleX;
    const height = rectangle.height * scaleY;
    return {
      ...obj,
      x,
      y,
      width,
      height,
    };
  } else {
    throw new Error(`Unknown object category`);
  }
}

export function mapFromCanvas(
  viewport: Viewport,
  canvas: HTMLCanvasElement,
  canvasX: number,
  canvasY: number,
): { x: number; y: number } {
  const scaleX = canvas.width / viewport.width;
  const scaleY = canvas.height / viewport.height;
  const viewportCenterX = viewport.x - viewport.width / 2;
  const viewportCenterY = viewport.y - viewport.height / 2;
  const worldX = (canvasX + viewportCenterX * scaleX) / scaleX;
  const worldY = (canvasY + viewportCenterY * scaleY) / scaleY;
  return { x: worldX, y: worldY };
}
