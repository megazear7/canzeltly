import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import "./component.input.js";
import { GameState } from "../game/game.js";
import { saveGameState } from "./util.storage.js";
import { CircleState } from "../game/object.circle.js";
import { RectangleState } from "../game/object.rectangle.js";

@customElement("canzeltly-create-game-page")
export class CanzeltlyCreateGamePage extends CanzeltlyAppProvider {
  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 0;

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 600px;
        margin: 0 auto;
        padding: var(--size-large);
      }
      form {
        display: flex;
        flex-direction: column;
      }
      button {
        margin-top: var(--size-medium);
        padding: var(--size-medium);
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--size-small);
        cursor: pointer;
      }
      button:hover {
        background: var(--color-primary-dark);
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
            type="number"
            label="Number of Circles"
            .value="${this.numCircles}"
            .min="${0}"
            @input-change="${(e: CustomEvent) =>
              (this.numCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <button type="submit">Create Game</button>
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
    // Create background rectangles
    const background: RectangleState[] = [
      {
        x: 0,
        y: 0,
        category: "Rectangle",
        width: this.worldWidth,
        height: this.worldHeight,
        color: "#78530d",
        dx: 0,
        dy: 0,
      },
      {
        x: 10,
        y: 10,
        category: "Rectangle",
        width: this.worldWidth - 20,
        height: this.worldHeight - 20,
        color: "#53744c",
        dx: 0,
        dy: 0,
      },
    ];
    // Create circles
    const circles: CircleState[] = Array.from({ length: this.numCircles }, () => ({
      x: Math.random() * this.worldWidth,
      y: Math.random() * this.worldHeight,
      category: "Circle" as const,
      size: 10 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      dx: 0,
      dy: 0,
    }));
    // Create game state
    const gameState: GameState = {
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
      layers: [background, circles],
    };
    // Save
    saveGameState(gameState);
    // Navigate
    window.location.assign(`/play/${id}`);
  }
}
