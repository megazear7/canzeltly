import { GameObject } from "./game.object.js";
import { GameObjectLabel, GameObjectState, GameOverState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { checkForCollision } from "../shared/util.collision.js";
import { GameStatus, Victory } from "./game.js";

export const collection: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  const hasCollection = obj.state.affects.some((affect) => affect.category === AffectCategory.enum.Collection);
  if (hasCollection) {
    // Check collision with collectibles (green circles with no affects)
    obj.game.layers.forEach((layer) => {
      layer.forEach((otherObj) => {
        if (otherObj.state.id !== obj.state.id && checkForCollision(obj.state, otherObj.state)) {
          // Check if it's a collectible: green color and not an enemy (no GameOverCollision)
          const isCollectible =
            otherObj.state.labels.includes(GameObjectLabel.enum.Collectable) &&
            !otherObj.state.affects.some((a) => a.category === AffectCategory.enum.GameOverCollision);
          if (isCollectible) {
            // Collect it
            obj.game.removeObject(otherObj.state.id);
            obj.game.state.collected++;

            // Check for win condition in Adventure and Race modes
            if (
              (obj.game.state.mode === "Adventure" || obj.game.state.mode === "Race") &&
              obj.game.state.totalCollectibles !== undefined
            ) {
              if (obj.game.state.collected >= obj.game.state.totalCollectibles) {
                if (obj.game.state.status !== GameStatus.enum.GameOver) {
                  obj.game.end();
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
        }
      });
    });
  }
};
