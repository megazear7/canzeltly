import { GameObject, GameObjectCategory } from "./game.object.js";
import { Game } from "./game.js";
import { Circle, CircleState } from "./object.circle.js";
import { RectangleState, Rectangle } from "./object.rectangle.js";
import { AnyGameObjectState, GameObjectLayer } from "./type.game.js";

export function hydrateObjects(game: Game, layers: GameObjectLayer[]): GameObject<AnyGameObjectState>[][] {
  return layers.map((layer) => {
    return layer.map((objState) => {
      switch (objState.category) {
        case GameObjectCategory.enum.Circle:
          return new Circle(game, CircleState.parse(objState));
        case GameObjectCategory.enum.Rectangle:
          return new Rectangle(game, RectangleState.parse(objState));
        default:
          throw new Error(`Unknown game object category`);
      }
    });
  });
}
