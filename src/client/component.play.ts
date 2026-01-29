import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";
import { draw } from "../canvas/draw.canvas.js";

@customElement("canzeltly-play")
export class CanzeltlyPlay extends LitElement {
  @property({ type: String })
  name: string = "";

  static override styles = [
    globalStyles,
    css`
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
      }
    `,
  ];

  private game?: Game;
  private animationId?: number;
  private pressedKeys = new Set<string>();
  private lastTime: number = 0;

  @query("canvas") private canvas?: HTMLCanvasElement;

  override render(): TemplateResult {
    return html`
      <canvas></canvas>
    `;
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    if (this.name) {
      this.game = new Game();
      this.startGameLoop();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.detachGameInputListeners();
  }

  private startGameLoop(): void {
    this.attachGameInputListeners();
    this.lastTime = performance.now();
    const loop = (currentTime: number): void => {
      const deltaTime = currentTime - this.lastTime;
      if (deltaTime >= 1000 / 60) {
        if (this.canvas && this.game) {
          this.game.input.handleKeys(this.pressedKeys);
          this.game.update();
          this.game.alignViewport(this.canvas.width / this.canvas.height);
          draw(this.game, this.canvas);
        }
        this.lastTime = currentTime;
      }
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  private attachGameInputListeners(): void {
    window.addEventListener("keydown", this.keyDown.bind(this));
    window.addEventListener("keyup", this.keyUp.bind(this));
  }

  private detachGameInputListeners(): void {
    window.removeEventListener("keydown", this.keyDown.bind(this));
    window.removeEventListener("keyup", this.keyUp.bind(this));
  }

  private keyDown(event: KeyboardEvent): void {
    this.pressedKeys.add(event.key);
  }

  private keyUp(event: KeyboardEvent): void {
    this.pressedKeys.delete(event.key);
  }
}
