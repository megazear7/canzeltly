import { GameObject, GameObjectCategory, GameObjectState } from "./game.object.js";
import { Game, GameObjectLayer } from "./game.js";
import { Circle, CircleState } from "./object.circle.js";
import { Square, SquareState } from "./object.rectangle.js";

export function hydrateObjects(game: Game, layers: GameObjectLayer[]): GameObject<GameObjectState>[][] {
  return layers.map((layer) => {
    return layer.map((objState) => {
      switch (objState.category) {
        case GameObjectCategory.enum.Circle:
          return new Circle(game, CircleState.parse(objState));
        case GameObjectCategory.enum.Square:
          return new Square(game, SquareState.parse(objState));
        default:
          throw new Error(`Unknown game object category: ${objState.category}`);
      }
    });
  });
}
