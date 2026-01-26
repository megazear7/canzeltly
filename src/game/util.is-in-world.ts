import { GameObject, GameObjectState } from "./game.object.js";

export function isInWorld(obj: GameObject<GameObjectState>): boolean {
  const world = obj.game.state.world;
  const halfWidth = (obj.state.width ?? obj.state.size ?? 0) / 2;
  const halfHeight = (obj.state.height ?? obj.state.size ?? 0) / 2;
  return (
    obj.state.x - halfWidth >= 0 &&
    obj.state.x + halfWidth <= world.width &&
    obj.state.y - halfHeight >= 0 &&
    obj.state.y + halfHeight <= world.height
  );
}
