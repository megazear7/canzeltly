import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { GameState } from "../game/game.js";
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
        border: 1px solid var(--color-border);
        border-radius: var(--radius-medium);
        margin-bottom: var(--size-small);
        background: var(--color-surface);
      }
      .game-preview.selected {
        border-color: var(--color-1);
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
      button {
        padding: var(--size-small) var(--size-medium);
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-small);
        cursor: pointer;
      }
      button:hover {
        background: var(--color-primary-dark);
      }
      .kebab {
        background: none;
        color: var(--color-text);
        padding: var(--size-small);
      }
      .kebab:hover {
        background: var(--color-hover);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="game-preview ${this.selected ? "selected" : ""}">
        <input type="checkbox" class="checkbox" .checked=${this.selected} @change=${this.handleCheckboxChange} />
        <span class="name">${this.gameState.name}</span>
        <div class="actions">
          <button @click=${this.handlePlay}>Play Game</button>
          <button class="kebab" @click=${this.handleKebab}>${kebabIcon}</button>
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
    dispatch(this, NavigationEvent({ path: `/play/${this.gameState.id}` }));
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
