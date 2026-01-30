import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyModal } from "./component.modal.js";
import "./component.modal.js";

@customElement("canzeltly-heads-up-display")
export class CanzeltlyHeadsUpDisplay extends LitElement {
  @property({ attribute: false })
  game?: Game;

  @query("canzeltly-modal") private menuModal?: CanzeltlyModal;

  static override styles = [
    globalStyles,
    css`
      .hud {
        position: fixed;
        z-index: 100;
        width: 600px;
        height: 83px;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("/images/plank-1800x250.png");
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: var(--radius-medium) var(--radius-medium) 0 0;
      }

      .menu-options {
        display: flex;
        flex-direction: column;
        gap: var(--size-medium);
      }

      h2 {
        text-align: center;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="hud">
        <button @click=${this.openModal()}>Menu</button>
      </div>
      <canzeltly-modal @modal-opening=${this.handleModalOpening} @modal-closing=${this.handleModalClosing}>
        <div slot="body">
          <h2>Game Menu</h2>
          <div class="menu-options">
            <button @click=${this.saveGame}>Save Game</button>
            <button @click=${this.saveAndExit}>Save and Exit</button>
            <button @click=${this.exitWithoutSaving}>Exit without Saving</button>
          </div>
        </div>
      </canzeltly-modal>
    `;
  }

  private handleModalOpening(): void {
    this.game?.pause();
  }

  private handleModalClosing(): void {
    this.game?.resume();
  }

  private saveGame(): void {
    throw new Error("Unimplemented");
  }

  private saveAndExit(): void {
    throw new Error("Unimplemented");
  }

  private exitWithoutSaving(): void {
    throw new Error("Unimplemented");
  }

  private openModal(): () => void {
    return () => {
      this.menuModal?.open();
    };
  }
}
