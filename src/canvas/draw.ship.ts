import { DrawShip } from "../game/type.object.js";
import { VelocityState } from "../game/type.object.js";
import { AffectCategory } from "../game/game.affect.js";
import { AnyGameObjectState } from "../game/type.object.js";

const imageCache = new Map<string, HTMLImageElement>();

function getImage(src: string): HTMLImageElement {
  if (!imageCache.has(src)) {
    const img = new Image();
    img.src = src;
    imageCache.set(src, img);
  }
  return imageCache.get(src)!;
}

export function drawShip(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D, draw: DrawShip): void {
  // Find velocity affect
  const velocityAffect = obj.affects.find((affect) => affect.category === AffectCategory.enum.Velocity) as
    | VelocityState
    | undefined;

  let imageSrc = draw.noAccelerationImage;
  if (velocityAffect) {
    const { dx, dy } = velocityAffect;
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal movement dominant
      imageSrc = dx > 0 ? draw.acceleratingRightImage : draw.acceleratingLeftImage;
    } else if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical movement dominant
      imageSrc = dy > 0 ? draw.acceleratingDownImage : draw.acceleratingUpImage;
    }
    // If dx and dy are equal or zero, use no acceleration
  }

  const img = getImage(imageSrc);
  // Note: Images are cached, but may not be fully loaded yet
  if (img.complete) {
    const diameter = obj.radius * 2;
    ctx.drawImage(img, obj.x - obj.radius, obj.y - obj.radius, diameter, diameter);
  }
}
