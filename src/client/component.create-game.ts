import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { GameState } from "../game/game.js";
import { saveGameState, setPlayerAssignment } from "./util.storage.js";
import { createSurvivalGame } from "../game/mode.survival.js";
import { createAdventureGame } from "../game/mode.adventure.js";
import "./component.input.js";

@customElement("canzeltly-create-game")
export class CanzeltlyCreateGameComponent extends LitElement {
  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 10;
  @state() mode = "Survival";

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
          <div>
            <label>Mode:</label>
            <input
              type="radio"
              name="mode"
              value="Survival"
              .checked="${this.mode === "Survival"}"
              @change="${(e: Event) => (this.mode = (e.target as HTMLInputElement).value)}" />
            Survival
            <input
              type="radio"
              name="mode"
              value="Adventure"
              .checked="${this.mode === "Adventure"}"
              @change="${(e: Event) => (this.mode = (e.target as HTMLInputElement).value)}" />
            Adventure
          </div>
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
          ${this.mode === "Adventure"
            ? html`
                <canzeltly-input
                  type="slider"
                  label="Number of Circles (${this.numCircles})"
                  .value="${this.numCircles}"
                  .min="${0}"
                  .max="${1000}"
                  @input-change="${(e: CustomEvent) =>
                    (this.numCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
              `
            : ""}
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
    // Create game state
    let gameState: GameState;
    if (this.mode === "Survival") {
      gameState = createSurvivalGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
      });
      gameState.name = this.gameName;
      gameState.id = id;
    } else {
      gameState = createAdventureGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        numCircles: this.numCircles,
        gameName: this.gameName,
        gameId: id,
      });
    }
    saveGameState(gameState);
    // Set player assignment
    const playerId = gameState.players[0].playerId;
    setPlayerAssignment(id, playerId);
    this.dispatchEvent(new CustomEvent("game-created", { detail: { id, playerId } }));
  }
}
