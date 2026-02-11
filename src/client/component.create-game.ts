import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import {
  saveNewGameState,
  setPlayerAssignment,
  loadCustomGameMode,
  saveCustomGameMode,
  getAllCustomGameModes,
} from "./util.storage.js";
import { createSurvivalGame } from "../game/mode.survival.js";
import { createAdventureGame } from "../game/mode.adventure.js";
import { createRaceGame } from "../game/mode.race.js";
import "./component.input.js";
import "./component.modal.js";
import { GameState } from "../game/game.js";
import { CanzeltlyModal } from "./component.modal.js";
import { ModelSubmitEventName } from "./event.modal-submit.js";

@customElement("canzeltly-create-game")
export class CanzeltlyCreateGameComponent extends LitElement {
  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 10;
  @state() mode = "Survival";
  @state() timeLimit = 60;
  @state() health = 1;
  @state() numGreenCircles = 5;
  @state() numBouncy = 6;
  @state() numGravity = 0;
  @state() numHunter = 0;
  @state() numBlockade = 0;
  @state() numVoid = 0;
  @state() numGhost = 0;

  @state() modalContent: TemplateResult | null = null;

  @state() customModeName = "";

  @query("canzeltly-modal")
  modal!: CanzeltlyModal;

  constructor() {
    super();
    this.setDefaultsForMode();
    this.gameName = this.generateRandomName();
    this.loadFromUrlParams();
  }

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

  private loadFromUrlParams(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const modeName = urlParams.get("mode");
    if (modeName) {
      const customMode = loadCustomGameMode(modeName);
      if (customMode) {
        this.gameName = customMode.name;
        this.worldWidth = customMode.worldWidth;
        this.worldHeight = customMode.worldHeight;
        this.numCircles = customMode.numCircles;
        this.mode = customMode.mode;
        this.timeLimit = customMode.timeLimit;
        this.health = customMode.health;
        this.numGreenCircles = customMode.numGreenCircles;
        this.numBouncy = customMode.numBouncy;
        this.numGravity = customMode.numGravity;
        this.numHunter = customMode.numHunter;
        this.numBlockade = customMode.numBlockade;
        this.numVoid = customMode.numVoid;
        this.numGhost = customMode.numGhost;
      }
    }
  }

  private setDefaultsForMode(): void {
    if (this.mode === "Adventure") {
      this.numGreenCircles = 10;
      this.numBouncy = 5;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 3;
      this.numVoid = 0;
      this.numGhost = 0;
    } else if (this.mode === "Survival") {
      this.numGreenCircles = 0;
      this.numBouncy = 6;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 0;
      this.numVoid = 0;
      this.numGhost = 0;
    } else if (this.mode === "Race") {
      this.numGreenCircles = 5;
      this.numBouncy = 1;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 0;
      this.numVoid = 0;
      this.numGhost = 0;
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

      .button-row {
        display: flex;
        gap: var(--size-medium);
        margin-top: var(--size-medium);
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
              @change="${(e: Event) => {
                this.mode = (e.target as HTMLInputElement).value;
                this.setDefaultsForMode();
              }}"></canzeltly-input>
            Survival
            <input
              type="radio"
              name="mode"
              value="Adventure"
              .checked="${this.mode === "Adventure"}"
              @change="${(e: Event) => {
                this.mode = (e.target as HTMLInputElement).value;
                this.setDefaultsForMode();
              }}"></canzeltly-input>
            Adventure
            <input
              type="radio"
              name="mode"
              value="Race"
              .checked="${this.mode === "Race"}"
              @change="${(e: Event) => {
                this.mode = (e.target as HTMLInputElement).value;
                this.setDefaultsForMode();
              }}"></canzeltly-input>
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
          <canzeltly-input
            type="slider"
            label="Health (${this.health})"
            .value="${this.health}"
            .min="${1}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.health = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          ${
            this.mode === "Race"
              ? html`
                  <canzeltly-input
                    type="slider"
                    label="Time Limit (${this.timeLimit} seconds)"
                    .value="${this.timeLimit}"
                    .min="${1}"
                    .max="${300}"
                    @input-change="${(e: CustomEvent) =>
                      (this.timeLimit = Number((e.detail as { value: number }).value))}"></canzeltly-input>
                `
              : ""
          }
          <canzeltly-input
            type="slider"
            label="Number of Green Circles (${this.numGreenCircles})"
            .value="${this.numGreenCircles}"
            .min="${0}"
            .max="${1000}"
            @input-change="${(e: CustomEvent) =>
              (this.numGreenCircles = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Bouncy Circles (${this.numBouncy})"
            .value="${this.numBouncy}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numBouncy = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Gravity Circles (${this.numGravity})"
            .value="${this.numGravity}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numGravity = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Hunter Circles (${this.numHunter})"
            .value="${this.numHunter}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numHunter = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Blockade Circles (${this.numBlockade})"
            .value="${this.numBlockade}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numBlockade = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Void Circles (${this.numVoid})"
            .value="${this.numVoid}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numVoid = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Ghost Circles (${this.numGhost})"
            .value="${this.numGhost}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numGhost = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <div class="button-row">
            <button type="button" @click=${this.handleSaveCustomMode}>Save Custom Game Mode</button>
            <button class="primary" type="submit">Start Game</button>
          </div>
        </form>
      </main>
      <canzeltly-modal>
        <div slot="body">${this.modalContent}</div>
      </canzeltly-modal>
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
        numBouncy: this.numBouncy,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numGreenCircles: this.numGreenCircles,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        health: this.health,
      });
      gameState.name = this.gameName;
      gameState.id = id;
    } else if (this.mode === "Adventure") {
      gameState = createAdventureGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        numGreenCircles: this.numGreenCircles,
        numBouncy: this.numBouncy,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        gameName: this.gameName,
        gameId: id,
        health: this.health,
      });
    } else if (this.mode === "Race") {
      gameState = createRaceGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        timeLimit: this.timeLimit,
        numGreenCircles: this.numGreenCircles,
        numBouncy: this.numBouncy,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        gameName: this.gameName,
        gameId: id,
        health: this.health,
      });
    } else {
      throw new Error(`Unknown mode: ${this.mode}`);
    }
    saveNewGameState(gameState);
    // Set player assignment
    const playerId = gameState.players[0].playerId;
    setPlayerAssignment(id, playerId);
    this.dispatchEvent(new CustomEvent("game-created", { detail: { id, playerId } }));
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  private handleSaveCustomMode(): void {
    this.customModeName = this.gameName;
    this.modalContent = html`
      <h2>Save Custom Game Mode</h2>
      <canzeltly-input
        type="plaintext"
        onSecondarySurface
        .value="${this.customModeName}"
        @input-change="${(e: CustomEvent) =>
          (this.customModeName = (e.detail as { value: string }).value)}"></canzeltly-input>
      <div style="display: flex; gap: var(--size-small); margin-top: var(--size-medium);">
        <button @click=${this.confirmSave}>Save</button>
        <button @click=${() => this.modal.close()}>Cancel</button>
      </div>
    `;
    this.modal.open();
  }

  private confirmSave = (): void => {
    const name = this.customModeName.trim();
    if (!name) return;
    const existing = getAllCustomGameModes().find((m) => m.name === name);
    if (existing) {
      this.modalContent = html`
        <h2>Override Custom Game Mode</h2>
        <p>A custom game mode with this name already exists. Do you want to override it?</p>
        <button @click=${() => this.doSave(name)}>Override</button>
        <button @click=${() => this.modal.close()}>Cancel</button>
      `;
    } else {
      this.doSave(name);
    }
  };

  private doSave(name: string): void {
    const mode = {
      name,
      worldWidth: this.worldWidth,
      worldHeight: this.worldHeight,
      numCircles: this.numCircles,
      mode: this.mode,
      timeLimit: this.timeLimit,
      health: this.health,
      numGreenCircles: this.numGreenCircles,
      numBouncy: this.numBouncy,
      numGravity: this.numGravity,
      numHunter: this.numHunter,
      numBlockade: this.numBlockade,
      numVoid: this.numVoid,
      numGhost: this.numGhost,
    };
    saveCustomGameMode(mode);
    this.modal.close();
  }

  private handleModalSubmit = (): void => {
    // Handle submit if needed
  };
}
