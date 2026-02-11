import { GameObject } from "./game.object.js";
import { GameObjectState, GameOverState, HealthState } from "./type.object.js";
import { affect, AffectCategory } from "./game.affect.js";
import { Victory } from "./game.js";

export const gameOver: affect = function <T extends GameObjectState>(obj: GameObject<T>): void {
  obj.state.affects
    .filter((affect) => affect.category === AffectCategory.enum.GameOver)
    .forEach((affect) => {
      const gameOverState = affect as GameOverState;
      const playerId = gameOverState.playerId;

      // Check if health is 0 or less
      const healthAffect = obj.state.affects.find((a) => a.category === AffectCategory.enum.Health) as
        | HealthState
        | undefined;
      if (healthAffect && healthAffect.health <= 0) {
        obj.game.end();

        // Find the player and set victory to Lose
        const player = obj.game.state.players.find((p) => p.playerId === playerId);
        if (player && player.victory !== Victory.enum.Win) {
          player.victory = Victory.enum.Lose;
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
            obj.game.end();

            // Find the player and set victory to Lose
            const player = obj.game.state.players.find((p) => p.playerId === playerId);
            if (player && player.victory !== Victory.enum.Win) {
              player.victory = Victory.enum.Lose;
            }
          }
        }
      }
    });
};
