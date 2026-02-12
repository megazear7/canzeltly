import { Game } from "./game.js";
import { OccurrenceState } from "./game.affect.js";
import { shieldCircle } from "./object.circle.js";

export function spawnShield(occurrence: OccurrenceState, game: Game): void {
  if (Math.random() * 100 < occurrence.chance) {
    const circle = shieldCircle(game.state);
    game.addObject(circle);
  }
}
