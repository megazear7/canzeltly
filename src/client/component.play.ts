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
    const loop = (): void => {
      if (this.canvas && this.game) {
        this.game.update();
        this.game.alignViewport(this.canvas.width / this.canvas.height);
        draw(this.game, this.canvas);
      }
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
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
    switch (event.key) {
      case "ArrowUp":
        this.game?.input.moveViewport(0, -10);
        break;
      case "ArrowDown":
        this.game?.input.moveViewport(0, 10);
        break;
      case "ArrowLeft":
        this.game?.input.moveViewport(-10, 0);
        break;
      case "ArrowRight":
        this.game?.input.moveViewport(10, 0);
        break;
      case "+":
      case "=":
        this.game?.input.zoomIn(1.1);
        break;
      case "-":
      case "_":
        this.game?.input.zoomOut(0.9);
        break;
      case "c":
        this.game?.input.addCircle();
        break;
    }
  }

  private keyUp(): void {}
}
