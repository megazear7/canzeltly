import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { GameState } from "../game/game.js";
import { saveGameState, setPlayerAssignment } from "./util.storage.js";
import { createSurvivalGame } from "../game/mode.survival.js";
import { createAdventureGame } from "../game/mode.adventure.js";
import { createRaceGame } from "../game/mode.race.js";
import "./component.input.js";

@customElement("canzeltly-create-game")
export class CanzeltlyCreateGameComponent extends LitElement {
  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 10;
  @state() mode = "Survival";
  @state() timeLimit = 60;
  @state() numGreenCircles = 5;

  private adjectives = [
    "Epic",
    "Mystic",
    "Cosmic",
    "Galactic",
    "Enchanted",
    "Legendary",
    "Ancient",
    "Mighty",
    "Swift",
    "Brave",
    "Fierce",
    "Radiant",
    "Shadowy",
    "Golden",
    "Crystal",
    "Thunder",
    "Frosty",
    "Blazing",
    "Silent",
    "Wild",
  ];

  private nouns = [
    "Quest",
    "Journey",
    "Adventure",
    "Realm",
    "Kingdom",
    "World",
    "Galaxy",
    "Forest",
    "Mountain",
    "Ocean",
    "Castle",
    "Temple",
    "Cave",
    "Island",
    "Valley",
    "Peak",
    "Storm",
    "Flame",
    "Shadow",
    "Beast",
  ];

  constructor() {
    super();
    if (!this.gameName) {
      this.gameName = this.generateRandomName();
    }
  }

  private generateRandomName(): string {
    const adjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    const noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
    return `${adjective} ${noun}`;
  }

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
            <input
              type="radio"
              name="mode"
              value="Race"
              .checked="${this.mode === "Race"}"
              @change="${(e: Event) => (this.mode = (e.target as HTMLInputElement).value)}" />
            Race
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
                  .min="${1}"
                  .max="${1000}"
                  @input-change="${(e: CustomEvent) =>
                    (this.numCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
              `
            : ""}
          ${this.mode === "Race"
            ? html`
                <canzeltly-input
                  type="slider"
                  label="Time Limit (${this.timeLimit} seconds)"
                  .value="${this.timeLimit}"
                  .min="${1}"
                  .max="${300}"
                  @input-change="${(e: CustomEvent) =>
                    (this.timeLimit = Number((e.detail as { value: number }).value))}"></canzeltly-input>
                <canzeltly-input
                  type="slider"
                  label="Number of Green Circles (${this.numGreenCircles})"
                  .value="${this.numGreenCircles}"
                  .min="${1}"
                  .max="${100}"
                  @input-change="${(e: CustomEvent) =>
                    (this.numGreenCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
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
      this.gameName = this.generateRandomName();
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
    } else if (this.mode === "Adventure") {
      gameState = createAdventureGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        numCircles: this.numCircles,
        gameName: this.gameName,
        gameId: id,
      });
    } else if (this.mode === "Race") {
      gameState = createRaceGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        timeLimit: this.timeLimit,
        numGreenCircles: this.numGreenCircles,
        gameName: this.gameName,
        gameId: id,
      });
    } else {
      throw new Error(`Unknown mode: ${this.mode}`);
    }
    saveGameState(gameState);
    // Set player assignment
    const playerId = gameState.players[0].playerId;
    setPlayerAssignment(id, playerId);
    this.dispatchEvent(new CustomEvent("game-created", { detail: { id, playerId } }));
  }
}
