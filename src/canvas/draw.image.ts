import { DrawImage } from "../game/type.object.js";
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

export function drawImage(obj: AnyGameObjectState, ctx: CanvasRenderingContext2D): void {
  const draw = obj.draw as DrawImage;
  const img = getImage(draw.image);
  // Note: Images are cached, but may not be fully loaded yet
  if (img.complete) {
    const diameter = obj.radius * 2;
    ctx.drawImage(img, obj.x - obj.radius, obj.y - obj.radius, diameter, diameter);
  }
}
