import { GameObject, GameObjectState } from "./game.object.js";

export function isInWorld(obj: GameObject<GameObjectState>): boolean {
  const world = obj.game.state.world;
  const halfSize = obj.state.size / 2;
  return (
    obj.state.x - halfSize >= 0 &&
    obj.state.x + halfSize <= world.width &&
    obj.state.y - halfSize >= 0 &&
    obj.state.y + halfSize <= world.height
  );
}
