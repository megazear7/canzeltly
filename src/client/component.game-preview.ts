import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { GameState } from "../game/game.js";
import { getPlayerAssignment } from "./util.storage.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { kebabIcon } from "./icons.js";

@customElement("canzeltly-game-preview")
export class CanzeltlyGamePreview extends LitElement {
  @property({ type: Object })
  gameState!: GameState;

  @property({ type: Boolean })
  selected = false;

  static override styles = [
    globalStyles,
    css`
      .game-preview {
        display: flex;
        align-items: center;
        padding: var(--size-medium);
        box-shadow: var(--shadow-normal);
        border: var(--border-normal);
        border-radius: var(--border-radius-medium);
        margin-bottom: var(--size-large);
        background: var(--color-secondary-surface);
        transition: var(--transition-all);
      }
      .game-preview:hover {
        box-shadow: var(--shadow-hover);
      }
      .game-preview.selected {
        border: var(--border-active);
      }
      .checkbox {
        margin-right: var(--size-medium);
      }
      .name {
        flex: 1;
        font-weight: bold;
      }
      .actions {
        display: flex;
        gap: var(--size-small);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="game-preview ${this.selected ? "selected" : ""}">
        <input type="checkbox" class="checkbox" .checked=${this.selected} @change=${this.handleCheckboxChange} />
        <span class="name">${this.gameState.name}</span>
        <div class="actions">
          <button class="simple" @click=${this.handlePlay}>Play Game</button>
          <button class="simple" @click=${this.handleKebab}>${kebabIcon}</button>
        </div>
      </div>
    `;
  }

  private handleCheckboxChange(): void {
    // Dispatch event to provider to toggle selection
    this.dispatchEvent(
      new CustomEvent("toggle-selection", {
        detail: { id: this.gameState.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handlePlay(): void {
    const playerId = getPlayerAssignment(this.gameState.id);
    if (playerId) {
      dispatch(this, NavigationEvent({ path: `/play/game/${this.gameState.id}/player/${playerId}` }));
    } else if (this.gameState.players.length > 0) {
      const playerId = this.gameState.players[0].playerId;
      dispatch(this, NavigationEvent({ path: `/play/game/${this.gameState.id}/player/${playerId}` }));
    } else {
      alert("No player assigned to this game and no players exist within the game.");
    }
  }

  private handleKebab(): void {
    // Dispatch event to open modal with options
    this.dispatchEvent(
      new CustomEvent("open-game-options", {
        detail: { gameId: this.gameState.id },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
