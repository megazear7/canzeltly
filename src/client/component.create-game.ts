import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { GameMode } from "../game/type.game.js";
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
import { ProfileContext, profileContext } from "./context.js";

@customElement("canzeltly-create-game")
export class CanzeltlyCreateGameComponent extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @state()
  profileContext!: ProfileContext;

  @state() gameName = "";
  @state() worldWidth = 1000;
  @state() worldHeight = 1000;
  @state() numCircles = 10;
  @state() mode: GameMode = GameMode.enum.Survival;
  @state() timeLimit = 60;
  @state() health = 1;
  @state() numGreenCircles = 5;
  @state() numGremlakShips = 6;
  @state() numGravity = 0;
  @state() numHunter = 0;
  @state() numBlockade = 0;
  @state() numVoid = 0;
  @state() numGhost = 0;
  @state() spawnFoodChance = 0;
  @state() spawnShieldChance = 0;
  @state() spawnIceChance = 0;

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
    if (modeName && this.profileContext.currentProfile) {
      const customMode = loadCustomGameMode(modeName, this.profileContext.currentProfile.id);
      if (customMode) {
        this.gameName = customMode.name;
        this.worldWidth = customMode.worldWidth;
        this.worldHeight = customMode.worldHeight;
        this.numCircles = customMode.numCircles;
        this.mode = customMode.mode;
        this.timeLimit = customMode.timeLimit;
        this.health = customMode.health;
        this.numGreenCircles = customMode.numGreenCircles;
        this.numGremlakShips = customMode.numGremlakShips;
        this.numGravity = customMode.numGravity;
        this.numHunter = customMode.numHunter;
        this.numBlockade = customMode.numBlockade;
        this.numVoid = customMode.numVoid;
        this.numGhost = customMode.numGhost;
        this.spawnFoodChance = customMode.spawnFoodChance ?? 0;
        this.spawnShieldChance = customMode.spawnShieldChance ?? 0;
        this.spawnIceChance = customMode.spawnIceChance ?? 0;
      }
    }
  }

  private setDefaultsForMode(): void {
    if (this.mode === GameMode.enum.Adventure) {
      this.numGreenCircles = 10;
      this.numGremlakShips = 5;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 3;
      this.numVoid = 0;
      this.numGhost = 0;
      this.spawnFoodChance = 0;
      this.spawnShieldChance = 0;
      this.spawnIceChance = 0;
    } else if (this.mode === GameMode.enum.Survival) {
      this.numGreenCircles = 0;
      this.numGremlakShips = 6;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 0;
      this.numVoid = 0;
      this.numGhost = 0;
      this.spawnFoodChance = 0;
      this.spawnShieldChance = 0;
      this.spawnIceChance = 0;
    } else if (this.mode === GameMode.enum.Race) {
      this.numGreenCircles = 5;
      this.numGremlakShips = 1;
      this.numGravity = 0;
      this.numHunter = 0;
      this.numBlockade = 0;
      this.numVoid = 0;
      this.numGhost = 0;
      this.spawnFoodChance = 0;
      this.spawnShieldChance = 0;
      this.spawnIceChance = 0;
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
        max-width: var(--size-600);
        margin: 0 auto;
        padding: var(--size-large);
      }

      h1 {
        text-align: center;
        margin-bottom: var(--size-xl);
      }

      .mode-selector {
        display: flex;
        gap: 0;
        margin: var(--size-medium) 0;
        border-radius: var(--border-radius-small);
        overflow: hidden;
        border: var(--border-subtle);
      }

      .mode-selector label {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--size-small) var(--size-medium);
        cursor: pointer;
        background: var(--color-secondary-surface);
        color: var(--color-primary-text-muted);
        font-weight: var(--font-weight-medium);
        font-size: var(--font-small);
        transition: var(--transition-all);
        margin: 0;
        border-right: var(--border-subtle);
      }

      .mode-selector label:last-child {
        border-right: none;
      }

      .mode-selector label:hover {
        background: var(--color-secondary-surface-hover);
        color: var(--color-primary-text);
      }

      .mode-selector input[type="radio"] {
        display: none;
      }

      .mode-selector input[type="radio"]:checked + span {
        color: var(--color-primary-text);
      }

      .mode-selector label:has(input:checked) {
        background: var(--color-1);
        color: var(--color-primary-text);
      }

      .button-row {
        display: flex;
        gap: var(--size-medium);
        margin-top: var(--size-xl);
        justify-content: center;
      }

      .section-label {
        font-size: var(--font-small);
        color: var(--color-primary-text-muted);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        font-weight: var(--font-weight-semibold);
        margin-top: var(--size-large);
        margin-bottom: var(--size-small);
        padding-bottom: var(--size-small);
        border-bottom: var(--border-subtle);
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
          <div class="mode-selector">
            <label>
              <input
                type="radio"
                name="mode"
                value="${GameMode.enum.Survival}"
                .checked="${this.mode === GameMode.enum.Survival}"
                @change="${(e: Event) => {
                  this.mode = (e.target as HTMLInputElement).value as GameMode;
                  this.setDefaultsForMode();
                }}" />
              <span>Survival</span>
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="${GameMode.enum.Adventure}"
                .checked="${this.mode === GameMode.enum.Adventure}"
                @change="${(e: Event) => {
                  this.mode = (e.target as HTMLInputElement).value as GameMode;
                  this.setDefaultsForMode();
                }}" />
              <span>Adventure</span>
            </label>
            <label>
              <input
                type="radio"
                name="mode"
                value="${GameMode.enum.Race}"
                .checked="${this.mode === GameMode.enum.Race}"
                @change="${(e: Event) => {
                  this.mode = (e.target as HTMLInputElement).value as GameMode;
                  this.setDefaultsForMode();
                }}" />
              <span>Race</span>
            </label>
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
          ${this.mode === GameMode.enum.Race
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
            : ""}
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
            label="Spawn Food Chance (${this.spawnFoodChance}%)"
            .value="${this.spawnFoodChance}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.spawnFoodChance = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Spawn Shield Chance (${this.spawnShieldChance}%)"
            .value="${this.spawnShieldChance}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.spawnShieldChance = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Spawn Ice Chance (${this.spawnIceChance}%)"
            .value="${this.spawnIceChance}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.spawnIceChance = Number((e.detail as { value: number }).value))}"></canzeltly-input>
          <canzeltly-input
            type="slider"
            label="Number of Gremlak Ships (${this.numGremlakShips})"
            .value="${this.numGremlakShips}"
            .min="${0}"
            .max="${100}"
            @input-change="${(e: CustomEvent) =>
              (this.numGremlakShips = Number((e.detail as { value: number }).value))}"></canzeltly-input>
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
    const drawMode = this.profileContext.currentProfile?.drawMode || "graphical";
    let gameState: GameState;
    if (this.mode === GameMode.enum.Survival) {
      gameState = createSurvivalGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        numGremlakShips: this.numGremlakShips,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numGreenCircles: this.numGreenCircles,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        health: this.health,
        spawnFoodChance: this.spawnFoodChance,
        spawnShieldChance: this.spawnShieldChance,
        spawnIceChance: this.spawnIceChance,
        drawMode,
      });
      gameState.name = this.gameName;
      gameState.id = id;
    } else if (this.mode === GameMode.enum.Adventure) {
      gameState = createAdventureGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        numGreenCircles: this.numGreenCircles,
        numGremlakShips: this.numGremlakShips,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        gameName: this.gameName,
        gameId: id,
        health: this.health,
        spawnFoodChance: this.spawnFoodChance,
        spawnShieldChance: this.spawnShieldChance,
        spawnIceChance: this.spawnIceChance,
        drawMode,
      });
    } else if (this.mode === GameMode.enum.Race) {
      gameState = createRaceGame({
        width: this.worldWidth,
        height: this.worldHeight,
        playerId: crypto.randomUUID(),
        timeLimit: this.timeLimit,
        numGreenCircles: this.numGreenCircles,
        numGremlakShips: this.numGremlakShips,
        numGravity: this.numGravity,
        numHunter: this.numHunter,
        numBlockade: this.numBlockade,
        numVoid: this.numVoid,
        numGhost: this.numGhost,
        gameName: this.gameName,
        gameId: id,
        health: this.health,
        spawnFoodChance: this.spawnFoodChance,
        spawnShieldChance: this.spawnShieldChance,
        spawnIceChance: this.spawnIceChance,
        drawMode,
      });
    } else {
      throw new Error(`Unknown mode: ${this.mode}`);
    }
    saveNewGameState(gameState, this.profileContext.currentProfile!.id);
    // Set player assignment
    const playerId = gameState.players[0].playerId;
    setPlayerAssignment(id, playerId, this.profileContext.currentProfile!.id);
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
    if (!name || !this.profileContext.currentProfile) return;
    const existing = getAllCustomGameModes(this.profileContext.currentProfile.id).find((m) => m.name === name);
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
      numGremlakShips: this.numGremlakShips,
      numGravity: this.numGravity,
      numHunter: this.numHunter,
      numBlockade: this.numBlockade,
      numVoid: this.numVoid,
      numGhost: this.numGhost,
      spawnFoodChance: this.spawnFoodChance,
      spawnShieldChance: this.spawnShieldChance,
      spawnIceChance: this.spawnIceChance,
    };
    saveCustomGameMode(mode, this.profileContext.currentProfile!.id);
    this.modal.close();
  }

  private handleModalSubmit = (): void => {
    // Handle submit if needed
  };
}
