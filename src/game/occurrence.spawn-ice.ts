import { Game } from "./game.js";
import { OccurrenceState } from "./game.affect.js";
import { iceCircle } from "./object.circle.js";

export function spawnIce(occurrence: OccurrenceState, game: Game): void {
  if (Math.random() * 100 < occurrence.chance) {
    const circle = iceCircle(game.state);
    game.addObject(circle);
  }
}
