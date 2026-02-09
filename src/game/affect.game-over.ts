import { GameObject } from "./game.object.js";
import { GameObjectState, GameOverState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { GameStatus } from "./game.js";

export const gameOver: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.GameOver)
    .forEach((affect) => {
      const gameOverState = affect as GameOverState;
      const playerId = gameOverState.playerId;

      // Check if health is 0 or less
      if (obj.state.health <= 0) {
        obj.game.state.status = GameStatus.enum.GameOver;
        obj.game.state.ended = Date.now();

        // Find the player and set victory to Lose
        const player = obj.game.state.players.find((p) => p.playerId === playerId);
        if (player && player.victory !== "Win") {
          player.victory = "Lose";
        }
        return; // No need to check further
      }

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
