import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { Game } from "../game/game.js";
import { GameMode } from "../game/type.game.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyModal } from "./component.modal.js";
import { dispatch } from "./util.events.js";
import { NavigationEvent } from "./event.navigation.js";
import { SuccessEvent } from "./event.success.js";
import { saveGameState, deleteNewGameState } from "./util.storage.js";
import { AffectCategory } from "../game/game.affect.js";
import { HealthState } from "../game/type.object.js";
import { ProfileContext, profileContext } from "./context.js";
import "./component.modal.js";

@customElement("canzeltly-heads-up-display")
export class CanzeltlyHeadsUpDisplay extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  @property({ attribute: false })
  game?: Game;

  @property({ type: Boolean })
  isNewGame: boolean = false;

  @property({ type: Number })
  fps?: number;

  @query("canzeltly-modal") private menuModal?: CanzeltlyModal;

  static override styles = [
    globalStyles,
    css`
      .hud {
        position: fixed;
        z-index: 100;
        box-sizing: border-box;
        color: black;
        font-weight: bold;
        bottom: var(--size-10);
        left: 50%;
        transform: translateX(-50%);
        width: var(--size-600);
        aspect-ratio: 1800 / 250;
        display: flex;
        align-items: center;
        padding: 0 var(--size-medium);
        border-radius: var(--border-radius-medium);
        box-shadow: var(--shadow-normal);
        background-image: url("/images/plank-1800x250.png");
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0;
        gap: var(--size-large);
        justify-content: space-around;
      }

      .hud :last-child {
        margin-right: var(--size-medium);
      }

      .fps.low {
        color: var(--color-error);
      }

      .menu-options {
        display: flex;
        flex-direction: column;
        gap: var(--size-small);
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
        <div class="fps ${this.fps && this.fps < 30 ? "low" : ""}">${this.fps ? this.fps.toFixed(0) : ""} FPS</div>
        <div class="collected">${this.game ? this.getCollectedText() : ""}</div>
        <div class="health">${this.game ? this.getHealthText() : ""}</div>
      </div>
      <canzeltly-modal @modal-opening=${this.handleModalOpening} @modal-closing=${this.handleModalClosing}>
        <div slot="body">
          <h2>Game Menu</h2>
          <div class="menu-options">
            <button class="simple" @click=${this.saveGame}>Save Game</button>
            <button class="simple" @click=${this.saveAndExit}>Save and Exit</button>
            <button class="simple" @click=${this.exitWithoutSaving}>Exit without Saving</button>
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
    if (this.game && this.profileContext.currentProfile) {
      saveGameState(this.game.state, this.profileContext.currentProfile.id);
      if (this.isNewGame) {
        deleteNewGameState(this.profileContext.currentProfile.id);
      }
      dispatch(this, SuccessEvent("Game saved successfully"));
      this.menuModal?.close();
    }
  }

  private saveAndExit(): void {
    if (this.game && this.profileContext.currentProfile) {
      saveGameState(this.game.state, this.profileContext.currentProfile.id);
      if (this.isNewGame) {
        deleteNewGameState(this.profileContext.currentProfile.id);
      }
      this.menuModal?.close();
      dispatch(this, NavigationEvent({ path: "/" }));
    }
  }

  private exitWithoutSaving(): void {
    this.menuModal?.close();
    dispatch(this, NavigationEvent({ path: "/" }));
  }

  private getCollectedText(): string {
    if (!this.game) return "";
    const collected = this.game.state.collected;
    if (this.game.state.mode === GameMode.enum.Survival) {
      return `Collected: ${collected}`;
    } else if (this.game.state.mode === GameMode.enum.Adventure) {
      const total = this.game.state.totalCollectibles || 0;
      return `Collected: ${collected}/${total}`;
    } else if (this.game.state.mode === GameMode.enum.Race) {
      const total = this.game.state.totalCollectibles || 0;
      let timeText = "";
      if (this.game.state.startTime && this.game.state.timeLimit) {
        const elapsed = (Date.now() - this.game.state.startTime) / 1000;
        const remaining = Math.max(0, this.game.state.timeLimit - elapsed);
        timeText = ` | Time: ${remaining.toFixed(0)}s`;
      }
      return `Collected: ${collected}/${total}${timeText}`;
    }
    return "";
  }

  private getHealthText(): string {
    if (!this.game) return "";
    const player = this.game.state.players[0];
    if (player) {
      const playerObject = this.game.layers[1].find((obj) => obj.state.id === player.selectedObjects[0]);
      if (playerObject) {
        const healthAffect = playerObject.state.affects.find((a) => a.category === AffectCategory.enum.Health) as
          | HealthState
          | undefined;
        if (healthAffect) {
          return `Health: ${healthAffect.health}`;
        }
      }
    }
    return "";
  }

  private openModal(): () => void {
    return () => {
      this.menuModal?.open();
    };
  }
}
