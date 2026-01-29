import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Game } from "../game/game.js";
import { globalStyles } from "./styles.global.js";
import "./component.modal.js";

@customElement("canzeltly-heads-up-display")
export class CanzeltlyHeadsUpDisplay extends LitElement {
    @property({ attribute: false })
    game?: Game;

    static override styles = [
        globalStyles,
        css`
      .hud {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--size-medium);
        background-color: var(--color-secondary-surface);
        border-radius: var(--radius-medium) var(--radius-medium) 0 0;
        box-shadow: var(--shadow-normal);
      }
    `,
    ];

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

    override render(): TemplateResult {
        return html`
        <div class="hud">
            <button class="pause-button">Pause</button>
        </div>
        <canzeltly-modal @modal-opening=${this.handleModalOpening} @modal-closing=${this.handleModalClosing}>
            <button slot="open-button" class="pause-button">Pause</button>
            <div slot="body" class="menu">
            <h2>Game Menu</h2>
            <button @click=${this.saveGame}>Save Game</button>
            <button @click=${this.saveAndExit}>Save and Exit</button>
            <button @click=${this.exitWithoutSaving}>Exit without Saving</button>
            </div>
        </canzeltly-modal>
    `;
    }
}
