import { Game } from "./game.js";
import { OccurrenceState } from "./game.affect.js";
import { foodCircle } from "./object.circle.js";

export function spawnFood(occurrence: OccurrenceState, game: Game): void {
  if (Math.random() * 100 < occurrence.chance) {
    const circle = foodCircle(game.state);
    game.addObject(circle);
  }
}
