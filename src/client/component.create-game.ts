import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import "./component.input.js";
import { GameState } from "../game/game.js";
import { saveGameState } from "./util.storage.js";
import { CircleState } from "../game/type.object.js";
import { GameObjectCategory } from "../game/type.object.js";
import { newGame } from "../game/util.new-game.js";

@customElement("canzeltly-create-game")
export class CanzeltlyCreateGameComponent extends LitElement {
  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 10;

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 600px;
        margin: 0 auto;
        padding: var(--size-large);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <h1>Create New Game</h1>
        <form @submit="${this.handleSubmit}">
          <canzeltly-input
            type="plaintext"
            label="Game Name"
            .value="${this.gameName}"
            @input-change="${(e: CustomEvent) =>
              (this.gameName = (e.detail as { value: string }).value)}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="World Width (${this.worldWidth})"
            .value="${this.worldWidth}"
            .min="${100}"
            .max="${10000}"
            @input-change="${(e: CustomEvent) =>
              (this.worldWidth = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="World Height (${this.worldHeight})"
            .value="${this.worldHeight}"
            .min="${100}"
            .max="${10000}"
            @input-change="${(e: CustomEvent) =>
              (this.worldHeight = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Circles (${this.numCircles})"
            .value="${this.numCircles}"
            .min="${0}"
            .max="${1000}"
            @input-change="${(e: CustomEvent) =>
              (this.numCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <button class="primary" type="submit">Create Game</button>
        </form>
      </main>
    `;
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    if (!this.gameName.trim()) {
      alert("Game name is required");
      return;
    }
    // Generate id
    const id = this.gameName
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .replace(/ +/g, "-");
    if (!id) {
      alert("Invalid game name");
      return;
    }
    // Create circles
    const circles: CircleState[] = Array.from({ length: this.numCircles }, () => ({
      category: GameObjectCategory.enum.Circle,
      id: crypto.randomUUID(),
      affectors: [],
      x: Math.random() * this.worldWidth,
      y: Math.random() * this.worldHeight,
      radius: 10 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      dx: 0,
      dy: 0,
    }));
    // Create game state
    const gameState: GameState = {
      ...newGame(),
      name: this.gameName,
      id,
      world: {
        width: this.worldWidth,
        height: this.worldHeight,
      },
      viewport: {
        x: 0,
        y: 0,
        width: this.worldWidth,
        height: this.worldHeight,
      },
      controls: {
        scrollSpeed: 10,
      },
    };
    gameState.layers[1].push(...circles);
    // Save
    saveGameState(gameState);
    // Dispatch event
    this.dispatchEvent(new CustomEvent("game-created", { detail: { id } }));
  }
}
