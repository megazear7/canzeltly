import { GameObject } from "./game.object.js";
import { GameObjectState, GameOverState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { checkForCollision } from "../shared/util.collision.js";
import { GameStatus } from "./game.js";

export const gameOver: affect = function (obj: GameObject<GameObjectState>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.GameOver)
    .forEach((affect) => {
      const gameOverState = affect as GameOverState;
      const playerId = gameOverState.playerId;

      // Check collision with objects in specified layers that have GameOverCollision affect
      gameOverState.layers.forEach((layerIndex) => {
        const layer = obj.game.layers[layerIndex];
        if (layer) {
          layer.forEach((otherObj) => {
            // Don't check collision with self
            if (otherObj.state.id !== obj.state.id) {
              // Check if the other object has GameOverCollision affect
              const hasGameOverCollision = otherObj.state.affects.some(
                (a) => a.category === AffectCategory.enum.GameOverCollision,
              );
              if (hasGameOverCollision && checkForCollision(obj.state, otherObj.state)) {
                // Collision detected - game over
                obj.game.state.status = GameStatus.enum.GameOver;
                obj.game.state.ended = Date.now();

                // Find the player and set victory to Lose
                const player = obj.game.state.players.find((p) => p.playerId === playerId);
                if (player && player.victory !== "Win") {
                  player.victory = "Lose";
                }
              }
            }
          });
        }
      });
      if (obj.game.state.mode === "Race") {
        // Also check time limit
        if (obj.game.state.startTime && obj.game.state.timeLimit) {
          const currentTime = Date.now();
          const elapsed = (currentTime - obj.game.state.startTime) / 1000; // in seconds
          if (elapsed >= obj.game.state.timeLimit) {
            // Time's up - game over lose
            obj.game.state.status = GameStatus.enum.GameOver;
            obj.game.state.ended = currentTime;

            // Find the player and set victory to Lose
            const player = obj.game.state.players.find((p) => p.playerId === playerId);
            if (player && player.victory !== "Win") {
              player.victory = "Lose";
            }
          }
        }
      }
    });
};
