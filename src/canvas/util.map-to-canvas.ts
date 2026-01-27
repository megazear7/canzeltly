import { Game } from "../game/game.js";
import { GameObjectState } from "../game/game.object";

export function mapToCanvas(game: Game, canvas: HTMLCanvasElement, obj: GameObjectState): GameObjectState {
  const scale = canvas.width / game.state.viewport.width;
  const size = obj.size ? obj.size * scale : obj.size;
  const width = obj.width ? obj.width * scale : obj.width;
  const height = obj.height ? obj.height * scale : obj.height;
  const viewportX = game.state.viewport.x * scale;
  const viewportY = game.state.viewport.y * scale;
  const x = obj.x * scale - viewportX;
  const y = obj.y * scale - viewportY;

  return {
    ...obj,
    x,
    y,
    size,
    width,
    height,
  };
}
