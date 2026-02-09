import { GameObjectState } from "../game/type.object.js";

/**
 * Checks if two game objects are colliding based on their circular boundaries
 * @param object1 First game object
 * @param object2 Second game object
 * @returns true if the objects are colliding, false otherwise
 */
export function checkForCollision(object1: GameObjectState, object2: GameObjectState): boolean {
  const dx = object1.x - object2.x;
  const dy = object1.y - object2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= object1.radius + object2.radius;
}
