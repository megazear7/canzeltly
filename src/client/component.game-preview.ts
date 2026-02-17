import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { GameState } from "../game/game.js";
import { getPlayerAssignment } from "./util.storage.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { kebabIcon } from "./icons.js";
import { ProfileContext, profileContext } from "./context.js";

@customElement("canzeltly-game-preview")
export class CanzeltlyGamePreview extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  @property({ type: Object })
  gameState!: GameState;

  @property({ type: Boolean })
  selected = false;

  @property()
  onToggleSelection?: (id: string) => void;

  @property()
  onOpenGameOptions?: (id: string) => void;

  static override styles = [
    globalStyles,
    css`
      .game-preview {
        display: flex;
        align-items: center;
        padding: var(--size-medium) var(--size-large);
        box-shadow: var(--shadow-normal);
        border: var(--border-subtle);
        border-radius: var(--border-radius-medium);
        margin-bottom: var(--size-medium);
        background: var(--color-secondary-surface);
        transition: var(--transition-all);
      }
      .game-preview:hover {
        box-shadow: var(--shadow-hover);
        transform: var(--transform-hover);
        border-color: rgba(255, 255, 255, 0.1);
      }
      .game-preview.selected {
        border: var(--border-active);
        box-shadow: var(--shadow-active), var(--shadow-glow-1);
      }
      .checkbox {
        margin-right: var(--size-medium);
      }
      .name {
        flex: 1;
        font-weight: var(--font-weight-semibold);
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
    this.onToggleSelection?.(this.gameState.id);
  }

  private handlePlay(): void {
    if (!this.profileContext.currentProfile) return;

    const playerId = getPlayerAssignment(this.gameState.id, this.profileContext.currentProfile.id);
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
    this.onOpenGameOptions?.(this.gameState.id);
  }
}
