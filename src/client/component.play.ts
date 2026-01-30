import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";
import { draw } from "../canvas/draw.canvas.js";
import "./component.heads-up-display.js";
import { loadGameState } from "./util.storage.js";

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

  @query("canvas") private canvas?: HTMLCanvasElement;

  override render(): TemplateResult {
    return html`
      <canvas></canvas>
      <canzeltly-heads-up-display .game=${this.game}></canzeltly-heads-up-display>
    `;
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    document.body.style.overflow = "hidden";
    const gameState = loadGameState(this.name);
    if (gameState) {
      this.game = new Game(gameState);
      this.startGameLoop();
    } else if (this.name) {
      this.game = new Game();
      this.game.state.name = this.name;
      this.startGameLoop();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.body.style.overflow = "";
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.detachGameInputListeners();
  }

  private startGameLoop(): void {
    this.attachGameInputListeners();
    let lastDraw = performance.now();
    let lastMajorUpdate = performance.now();
    const loop = (currentTime: number): void => {
      if (this.canvas && this.game) {
        if (currentTime - lastMajorUpdate >= 1000 && this.game) {
          this.game.serializeState();
          lastMajorUpdate = currentTime;
        }
        if (currentTime - lastDraw >= 1000 / 60) {
          this.game.input.handleKeys(this.pressedKeys);
          this.game.update();
          this.game.alignViewport(this.canvas.width / this.canvas.height);
          draw(this.game, this.canvas);
          lastDraw = currentTime;
        }
      }
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  private attachGameInputListeners(): void {
    window.addEventListener("keydown", this.keyDown.bind(this));
    window.addEventListener("keyup", this.keyUp.bind(this));
    window.addEventListener("wheel", this.preventScroll.bind(this), { passive: false });
  }

  private detachGameInputListeners(): void {
    window.removeEventListener("keydown", this.keyDown.bind(this));
    window.removeEventListener("keyup", this.keyUp.bind(this));
    window.removeEventListener("wheel", this.preventScroll.bind(this));
  }

  private keyDown(event: KeyboardEvent): void {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "+", "=", "-", "_"].includes(event.key)) {
      event.preventDefault();
    }
    this.pressedKeys.add(event.key);
  }

  private keyUp(event: KeyboardEvent): void {
    this.pressedKeys.delete(event.key);
  }

  private preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }
}
