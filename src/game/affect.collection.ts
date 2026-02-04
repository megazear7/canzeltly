import { GameObject } from "./game.object.js";
import { GameObjectState, GameOverState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { checkForCollision } from "../shared/util.collision.js";
import { GameStatus, Victory } from "./game.js";

export const collection: affect = function (obj: GameObject<GameObjectState>): void {
  const hasCollection = obj.state.affects.some((affect) => affect.category === AffectCategory.enum.Collection);
  if (hasCollection) {
    // Check collision with collectibles (green circles with no affects)
    obj.game.layers.forEach((layer) => {
      layer.forEach((otherObj) => {
        if (otherObj.state.id !== obj.state.id && checkForCollision(obj.state, otherObj.state)) {
          // Check if it's a collectible: green color and no affects (simple check)
          if (otherObj.state.color === "#00FF00" && otherObj.state.affects.length === 0) {
            // Collect it
            obj.game.removeObject(otherObj.state.id);
            obj.game.state.collected++;

            // Check for win condition in Adventure mode
            if (obj.game.state.mode === "Adventure" && obj.game.state.totalCollectibles !== undefined) {
              if (obj.game.state.collected >= obj.game.state.totalCollectibles) {
                obj.game.state.status = GameStatus.enum.GameOver;
                obj.game.state.ended = Date.now();
                // Set victory for the player
                const gameOverAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.GameOver) as
                  | GameOverState
                  | undefined;
                const playerId = gameOverAffect?.playerId;
                const player = obj.game.state.players.find((p) => p.playerId === playerId);
                if (player) {
                  player.victory = Victory.enum.Win;
                }
              }
            }
          }
        }
      });
    });
  }
};
