import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";
import { draw } from "../canvas/draw.canvas.js";
import { loadGameState } from "./util.storage.js";
import { CanzeltlyHeadsUpDisplay } from "./component.heads-up-display.js";
import "./component.heads-up-display.js";
import { mapFromCanvas } from "../canvas/util.map-to-canvas.js";
import { newGame } from "../game/util.new-game.js";

@customElement("canzeltly-play")
export class CanzeltlyPlay extends LitElement {
  @property({ type: String })
  gameId: string = "";

  @property({ type: String })
  playerId: string = "";

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
  private drawCount = 0;

  @query("canvas") private canvas?: HTMLCanvasElement;
  @query("canzeltly-heads-up-display") private hud?: CanzeltlyHeadsUpDisplay;

  override render(): TemplateResult {
    return html`
      <canvas></canvas>
      <canzeltly-heads-up-display .game=${this.game}></canzeltly-heads-up-display>
    `;
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    document.body.style.overflow = "hidden";
    const gameState = loadGameState(this.gameId);
    if (gameState) {
      this.game = new Game(gameState);
    } else if (this.gameId && this.playerId) {
      this.game = new Game(newGame({ playerId: this.playerId }));
      this.game.state.id = this.gameId;
    }

    if (this.game) {
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
    let lastDraw = performance.now();
    let lastMajorUpdate = performance.now();
    let once = true;
    const loop = (currentTime: number): void => {
      if (once && this.canvas && this.game) {
        once = false;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.game.alignViewport(this.canvas.width / this.canvas.height);
        this.attachGameInputListeners();
      }
      if (this.canvas && this.game) {
        if (currentTime - lastMajorUpdate >= 1000 && this.game) {
          this.game.serializeState();
          const fps = this.drawCount;
          if (this.hud) {
            this.hud.fps = fps;
          }
          this.drawCount = 0;
          lastMajorUpdate = currentTime;
        }
        if (currentTime - lastDraw >= 1000 / 60) {
          this.game.alignViewport(this.canvas.width / this.canvas.height);
          this.game.input.handleKeys(this.pressedKeys);
          this.game.update();
          // Get viewPortIndex from the "currentPlayer" .
          const currentPlayer = this.game.state.players.find((p) => p.playerId === this.playerId);
          const viewPortIndex = currentPlayer ? currentPlayer.viewportIndex : 0;
          draw(this.game, this.canvas, viewPortIndex);
          this.drawCount++;
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
    if (this.canvas) {
      window.addEventListener("click", this.handleCanvasClick.bind(this));
    }
  }

  private detachGameInputListeners(): void {
    window.removeEventListener("keydown", this.keyDown.bind(this));
    window.removeEventListener("keyup", this.keyUp.bind(this));
    window.removeEventListener("wheel", this.preventScroll.bind(this));
    if (this.canvas) {
      window.removeEventListener("click", this.handleCanvasClick.bind(this));
    }
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

  private handleCanvasClick(event: MouseEvent): void {
    if (!this.canvas || !this.game) return;
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    const currentPlayer = this.game.state.players.find((p) => p.playerId === this.playerId);
    const viewportIndex = currentPlayer ? currentPlayer.viewportIndex : 0;
    const viewport = this.game.state.viewports[viewportIndex];
    const worldPos = mapFromCanvas(viewport, this.canvas, canvasX, canvasY);
    this.game.input.handleCanvasClick(this.playerId, worldPos.x, worldPos.y);
  }
}
