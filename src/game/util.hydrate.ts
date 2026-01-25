import { GameObject, GameObjectState } from "./game.object";
import { Game } from "./game";
import { Circle, CircleState } from "./game.circle";
import { GameObjectCategory } from "./type.game";

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
