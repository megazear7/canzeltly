import { GameObject, GameObjectCategory, GameObjectState } from "./game.object.js";
import { Game } from "./game.js";
import { Circle, CircleState } from "./game.circle.js";

export function hydrateObjects(game: Game, objects: GameObjectState[]): GameObject<GameObjectState>[] {
  return objects.map((objState) => {
    switch (objState.category) {
      case GameObjectCategory.enum.Circle:
        return new Circle(game, CircleState.parse(objState));
      default:
        throw new Error(`Unknown game object category: ${objState.category}`);
    }
  });
}
