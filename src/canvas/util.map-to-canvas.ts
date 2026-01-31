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
  const scale = canvas.width / viewport.width;
  const viewportCenterX = (viewport.x - viewport.width / 2) * scale;
  const viewportCenterY = (viewport.y - viewport.height / 2) * scale;
  const x = obj.x * scale - viewportCenterX;
  const y = obj.y * scale - viewportCenterY;

  if (obj.category === GameObjectCategory.enum.Circle) {
    const circle = obj as CircleState;
    const size = circle.radius ? circle.radius * scale : circle.radius;
    return {
      ...obj,
      x,
      y,
      radius: size,
    };
  } else if (obj.category === GameObjectCategory.enum.Rectangle) {
    const rectangle = obj as RectangleState;
    const width = rectangle.width ? rectangle.width * scale : rectangle.width;
    const height = rectangle.height ? rectangle.height * scale : rectangle.height;
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
