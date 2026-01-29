import { Game } from "../game/game.js";
import { GameObjectState } from "../game/game.object";

export function mapToCanvas(game: Game, canvas: HTMLCanvasElement, obj: GameObjectState): GameObjectState {
  const scale = canvas.width / game.state.viewport.width;
  const size = obj.size ? obj.size * scale : obj.size;
  const width = obj.width ? obj.width * scale : obj.width;
  const height = obj.height ? obj.height * scale : obj.height;
  const viewportCenterX = (game.state.viewport.x - game.state.viewport.width / 2) * scale;
  const viewportCenterY = (game.state.viewport.y - game.state.viewport.height / 2) * scale;
  const x = obj.x * scale - viewportCenterX;
  const y = obj.y * scale - viewportCenterY;

  return {
    ...obj,
    x,
    y,
    size,
    width,
    height,
  };
}
