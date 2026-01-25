import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";

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
  private canvas?: HTMLCanvasElement;
  private animationId?: number;

  override render(): TemplateResult {
    return html`
      <canvas></canvas>
    `;
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.canvas = this.shadowRoot?.querySelector("canvas") as HTMLCanvasElement;
    if (this.name) {
      this.game = new Game(this.name);
      this.startGameLoop();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startGameLoop(): void {
    const loop = (): void => {
      this.updateGame();
      this.drawGame();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  private updateGame(): void {
    if (this.game) {
      // Update game logic here
      // For example, move objects based on velocity
      this.game.objects.forEach((obj) => {
        obj.update();
      });
    }
  }

  private drawGame(): void {
    if (this.canvas && this.game) {
      const ctx = this.canvas.getContext("2d");
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set canvas size
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Render objects
        this.game.objects.forEach((obj) => {
          obj.draw(ctx);
        });
      }
    }
  }
}
