import { html, css, TemplateResult, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { Game } from "../game/game.js";
import { CanzeltlyModal } from "./component.modal.js";

@customElement("canzeltly-game-over-modal")
export class CanzeltlyGameOverModal extends LitElement {
  @property({ type: Object })
  game?: Game;

  @property({ type: String })
  playerId: string = "";

  @query("canzeltly-modal")
  private modal?: CanzeltlyModal;

  static override styles = [
    globalStyles,
    css`
      .modal-content {
        text-align: center;
        padding: var(--size-xl);
      }

      .result {
        font-size: var(--font-size-xl);
        font-weight: bold;
        margin: var(--size-large) 0;
      }

      .result.win {
        color: var(--color-success);
      }

      .result.lose {
        color: var(--color-error);
      }

      .stats {
        margin: var(--size-large) 0;
      }

      .stat {
        margin: var(--size-medium) 0;
      }
    `,
  ];

  override render(): TemplateResult {
    if (!this.game) return html``;

    const player = this.game.state.players.find((p) => p.playerId === this.playerId);
    const victory = player?.victory || "Unknown";
    // TODO: The duration property is always 0 and the victory property is always "Unknown". Fix this. Add console logs and debug with the chrome devtools mcp.
    const duration = this.game.state.duration ? Math.round(this.game.state.duration / 1000) : 0;

    return html`
      <canzeltly-modal .closeable=${false}>
        <div slot="body" class="modal-content">
          <h1>Game Over</h1>
          <div class="result ${victory === "Win" ? "win" : "lose"}">${victory === "Win" ? "Victory!" : "Defeat"}</div>
          <div class="stats">
            <div class="stat">Duration: ${duration} seconds</div>
            <div class="stat">Objects: ${this.game.state.layers[1].length}</div>
          </div>
          <a href="/summary/game/${this.game.state.id}/player/${this.playerId}" class="standalone primary">
            View Summary
          </a>
        </div>
      </canzeltly-modal>
    `;
  }

  open(): void {
    this.modal?.open();
  }
}
