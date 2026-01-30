import { Game } from "../game/game.js";
import { GameObjectCategory } from "../game/game.object";
import { CircleState } from "../game/object.circle.js";
import { RectangleState } from "../game/object.rectangle.js";
import { AnyGameObjectState } from "../game/type.game.js";

export function mapToCanvas(game: Game, canvas: HTMLCanvasElement, obj: AnyGameObjectState): AnyGameObjectState {
  const scale = canvas.width / game.state.viewport.width;
  const viewportCenterX = (game.state.viewport.x - game.state.viewport.width / 2) * scale;
  const viewportCenterY = (game.state.viewport.y - game.state.viewport.height / 2) * scale;
  const x = obj.x * scale - viewportCenterX;
  const y = obj.y * scale - viewportCenterY;

  if (obj.category === GameObjectCategory.enum.Circle) {
    const circle = CircleState.parse(obj);
    const size = circle.size ? circle.size * scale : circle.size;
    return {
      ...obj,
      x,
      y,
      size,
    };
  } else if (obj.category === GameObjectCategory.enum.Rectangle) {
    const rectangle = RectangleState.parse(obj);
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
