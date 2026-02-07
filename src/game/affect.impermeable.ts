import { GameObject } from "./game.object.js";
import { affect } from "./game.affect.js";
import { checkForCollision } from "../shared/util.collision.js";

export const impermeable: affect = function (obj: GameObject<any>): void {
  // Find the layer this object is in
  const layerIndex = obj.game.layers.findIndex((layer) => layer.includes(obj));
  if (layerIndex === -1) return;

  const layer = obj.game.layers[layerIndex];

  for (const other of layer) {
    if (other === obj) continue;

    if (checkForCollision(obj.state, other.state)) {
      // Calculate direction from other to this
      const dx = obj.state.x - other.state.x;
      const dy = obj.state.y - other.state.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance === 0) {
        // If exactly on top, move randomly
        obj.state.x += (Math.random() - 0.5) * 10;
        obj.state.y += (Math.random() - 0.5) * 10;
        continue;
      }

      // Overlap amount
      const overlap = obj.state.radius + other.state.radius - distance;

      // Normalize direction
      const nx = dx / distance;
      const ny = dy / distance;

      // Move this object away by the overlap amount
      obj.state.x += nx * overlap;
      obj.state.y += ny * overlap;
    }
  }
};
