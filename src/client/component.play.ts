import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { Game, GameStatus, Victory } from "../game/game.js";
import { GameMode } from "../game/type.game.js";
import { globalStyles } from "./styles.global.js";
import { draw } from "../canvas/draw.canvas.js";
import {
  loadGameState,
  loadNewGameState,
  saveGameState,
  deleteNewGameState,
  getCampaignInstance,
  saveActiveCampaign,
  loadCustomGameMode,
} from "./util.storage.js";
import { CanzeltlyHeadsUpDisplay } from "./component.heads-up-display.js";
import { mapFromCanvas } from "../canvas/util.map-to-canvas.js";
import { createSurvivalGame } from "../game/mode.survival.js";
import { createAdventureGame } from "../game/mode.adventure.js";
import { createRaceGame } from "../game/mode.race.js";
import { newGame } from "../game/util.new-game.js";
import { ProfileContext, profileContext } from "./context.js";
import { CanzeltlyGameOverModal } from "./component.game-over-modal.js";
import { CanzeltlyModal } from "./component.modal.js";
import { getCampaignBySlug } from "../shared/data.campaigns.js";
import { CampaignGame, CampaignInstance } from "../shared/type.campaign.js";
import { dispatch } from "./util.events.js";
import { NavigationEvent } from "./event.navigation.js";
import { Achievements } from "../shared/type.achievement.js";
import {
  updateGamesPlayed,
  updateGreenCirclesCollected,
  updateSurvivalTime,
  updateCampaignsDefeated,
} from "../shared/util.achievements.js";
import { BadgeUnlockedEvent } from "./event.badge-unlocked.js";
import "./component.heads-up-display.js";
import "./component.game-over-modal.js";
import "./component.modal.js";

@customElement("canzeltly-play")
export class CanzeltlyPlay extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  @property({ type: String })
  gameId: string = "";

  @property({ type: String })
  playerId: string = "";

  @property({ type: Boolean })
  isNewGame: boolean = false;

  @property({ type: String })
  instanceId: string = "";

  @property({ type: String })
  modeName: string = "";

  @property({ type: Object })
  achievements: Achievements | undefined;

  @property({ type: Function })
  onAchievementsUpdate: ((achievements: Achievements) => void) | undefined;

  @state()
  isLastGame: boolean = false;

  static override styles = [
    globalStyles,
    css`
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
      }

      .campaign-modal-content {
        text-align: center;
        padding: var(--size-xl);
      }

      .campaign-modal-content h2 {
        margin-top: 0;
      }

      .campaign-modal-content p {
        font-size: var(--font-medium);
        line-height: 1.6;
        margin: var(--size-large) 0;
      }

      .campaign-modal-actions {
        display: flex;
        gap: var(--size-medium);
        justify-content: center;
        margin-top: var(--size-large);
      }

      .result-win {
        color: var(--color-success);
      }

      .result-lose {
        color: var(--color-error);
      }
    `,
  ];

  private game?: Game;
  private animationId?: number;
  private pressedKeys = new Set<string>();
  private drawCount = 0;
  private gameOverModalShown = false;

  @state()
  private campaignGame?: CampaignGame;

  @state()
  private campaignInstance?: CampaignInstance;

  @state()
  private campaignResult: "win" | "lose" | null = null;

  @query("canvas") private canvas?: HTMLCanvasElement;
  @query("canzeltly-heads-up-display") private hud?: CanzeltlyHeadsUpDisplay;
  @query("canzeltly-game-over-modal") private gameOverModal?: CanzeltlyGameOverModal;
  @query("#campaign-intro-modal") private introModal?: CanzeltlyModal;
  @query("#campaign-result-modal") private resultModal?: CanzeltlyModal;

  override render(): TemplateResult {
    if (this.instanceId) {
      return html`
        <canvas></canvas>
        <canzeltly-heads-up-display .game=${this.game} .isNewGame=${false}></canzeltly-heads-up-display>
        ${this.renderCampaignIntroModal()} ${this.renderCampaignResultModal()}
      `;
    }
    return html`
      <canvas></canvas>
      <canzeltly-heads-up-display .game=${this.game} .isNewGame=${this.isNewGame}></canzeltly-heads-up-display>
      <canzeltly-game-over-modal .game=${this.game} .playerId=${this.playerId}></canzeltly-game-over-modal>
    `;
  }

  private renderCampaignIntroModal(): TemplateResult {
    if (!this.campaignGame) return html``;
    return html`
      <canzeltly-modal id="campaign-intro-modal" .closeable=${false}>
        <div slot="body" class="campaign-modal-content">
          <h2>${this.campaignGame.name}</h2>
          <p>${this.campaignGame.intro.text}</p>
          <div class="campaign-modal-actions">
            <button class="primary" @click=${this.startCampaignGame}>Start Game</button>
          </div>
        </div>
      </canzeltly-modal>
    `;
  }

  private renderCampaignResultModal(): TemplateResult {
    if (!this.campaignGame || !this.campaignResult) return html``;
    const isWin = this.campaignResult === "win";
    const text = isWin ? this.campaignGame.victory.text : this.campaignGame.defeat.text;
    const hasUpgrades = isWin && this.campaignGame.upgrades;

    return html`
      <canzeltly-modal id="campaign-result-modal" .closeable=${false}>
        <div slot="body" class="campaign-modal-content">
          <h2 class="${isWin ? "result-win" : "result-lose"}">${isWin ? "Victory!" : "Defeat"}</h2>
          <p>${text}</p>
          <div class="campaign-modal-actions">
            ${isWin
              ? html`
                  <button class="primary" @click=${this.continueCampaign}>
                    ${hasUpgrades ? "Upgrade Hero" : this.isLastGame ? "Finish Campaign" : "Continue Campaign"}
                  </button>
                `
              : html`
                  <button class="primary" @click=${this.retryCampaignGame}>Try Again</button>
                `}
            <button @click=${this.goHome}>Back to Home</button>
          </div>
        </div>
      </canzeltly-modal>
    `;
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    document.body.style.overflow = "hidden";

    if (!this.profileContext.currentProfile) return;

    if (this.instanceId) {
      await this.initCampaignGame();
      return;
    }

    if (this.modeName) {
      await this.initCustomGame();
      return;
    }

    let gameState;
    if (this.isNewGame) {
      gameState = loadNewGameState(this.profileContext.currentProfile!.id) ?? newGame({ playerId: this.playerId });
    } else {
      gameState = loadGameState(this.gameId, this.profileContext.currentProfile!.id);
    }
    if (gameState) {
      this.game = new Game(gameState);
    } else if (this.gameId && this.playerId) {
      this.game = new Game(createSurvivalGame({ playerId: this.playerId }));
      this.game.state.id = this.gameId;
    }

    if (this.game) {
      this.startGameLoop();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.body.style.overflow = "";
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.detachGameInputListeners();
  }

  private startGameLoop(): void {
    let lastDraw = performance.now();
    let lastMajorUpdate = performance.now();
    let once = true;
    const loop = (currentTime: number): void => {
      if (once && this.canvas && this.game) {
        once = false;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.game.alignViewport(this.canvas.width / this.canvas.height);
        this.attachGameInputListeners();
        // Set started timestamp on first loop iteration
        if (!this.game.state.started) {
          this.game.state.started = Date.now();
          // Set game status to Playing when the game starts
          this.game.state.status = "Playing";
          // For Race mode, set startTime
          if (this.game.state.mode === GameMode.enum.Race) {
            this.game.state.startTime = this.game.state.started;
          }
        }
      }
      if (this.canvas && this.game) {
        // Check game status
        if (this.game.state.status === GameStatus.enum.GameOver && !this.gameOverModalShown) {
          this.gameOverModalShown = true;
          this.game.state.ended = Date.now();
          // Stop animation loop
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = undefined;
          }
          this.requestUpdate();
          saveGameState(this.game.state, this.profileContext.currentProfile!.id);
          if (this.isNewGame) {
            deleteNewGameState(this.profileContext.currentProfile!.id);
          }

          // Update achievements
          this.updateAchievementsOnGameOver();

          if (this.instanceId && this.campaignInstance) {
            this.handleCampaignGameOver();
          } else {
            this.gameOverModal?.open();
            this.gameOverModal?.requestUpdate();
          }
          return;
        }

        if (currentTime - lastMajorUpdate >= 1000 && this.game) {
          this.game.state.duration += currentTime - lastMajorUpdate;
          this.game.serializeState();
          this.game.majorUpdates();
          const fps = this.drawCount;
          if (this.hud) {
            this.hud.fps = fps;
          }
          this.drawCount = 0;
          lastMajorUpdate = currentTime;
        }
        if (currentTime - lastDraw >= 1000 / 60) {
          this.game.alignViewport(this.canvas.width / this.canvas.height);
          this.game.input.handleKeys(this.pressedKeys, this.playerId);
          this.game.update();
          // Get viewPortIndex from the "currentPlayer" .
          const currentPlayer = this.game.state.players.find((p) => p.playerId === this.playerId);
          const viewPortIndex = currentPlayer ? currentPlayer.viewportIndex : 0;
          draw(this.game, this.canvas, viewPortIndex);
          this.drawCount++;
          lastDraw = currentTime;
        }
      }
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  private attachGameInputListeners(): void {
    window.addEventListener("keydown", this.keyDown.bind(this));
    window.addEventListener("keyup", this.keyUp.bind(this));
    window.addEventListener("wheel", this.preventScroll.bind(this), { passive: false });
    if (this.canvas) {
      window.addEventListener("click", this.handleCanvasClick.bind(this));
    }
  }

  private detachGameInputListeners(): void {
    window.removeEventListener("keydown", this.keyDown.bind(this));
    window.removeEventListener("keyup", this.keyUp.bind(this));
    window.removeEventListener("wheel", this.preventScroll.bind(this));
    if (this.canvas) {
      window.removeEventListener("click", this.handleCanvasClick.bind(this));
    }
  }

  private keyDown(event: KeyboardEvent): void {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "+", "=", "-", "_", " "].includes(event.key)) {
      event.preventDefault();
    }
    this.pressedKeys.add(event.key);
  }

  private keyUp(event: KeyboardEvent): void {
    this.pressedKeys.delete(event.key);
  }

  private preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  private handleCanvasClick(event: MouseEvent): void {
    if (!this.canvas || !this.game) return;
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    const currentPlayer = this.game.state.players.find((p) => p.playerId === this.playerId);
    const viewportIndex = currentPlayer ? currentPlayer.viewportIndex : 0;
    const viewport = this.game.state.viewports[viewportIndex];
    const worldPos = mapFromCanvas(viewport, this.canvas, canvasX, canvasY);
    this.game.input.handleCanvasClick(this.playerId, worldPos.x, worldPos.y);
  }

  private async initCampaignGame(): Promise<void> {
    const instance = getCampaignInstance(this.instanceId, this.profileContext.currentProfile!.id);
    if (!instance) return;

    const campaign = getCampaignBySlug(instance.campaignSlug);
    if (!campaign) return;

    this.campaignInstance = instance;
    const gameIndex = instance.currentGameIndex;
    const campaignGame = campaign.games[gameIndex];
    if (!campaignGame) return;

    this.campaignGame = campaignGame;
    this.isLastGame = gameIndex + 1 >= campaign.games.length;

    // Create the game state from campaign game mode
    const mode = campaignGame.mode;
    const health = instance.heroStats.health;
    const breakSpeed = instance.heroStats.breakSpeed;

    let gameState;
    if (mode.mode === GameMode.enum.Adventure) {
      gameState = createAdventureGame({
        width: mode.worldWidth,
        height: mode.worldHeight,
        playerId: this.playerId,
        numGreenCircles: mode.numGreenCircles,
        numGremlakShips: mode.numGremlakShips,
        numGravity: mode.numGravity,
        numHunter: mode.numHunter,
        numBlockade: mode.numBlockade,
        numVoid: mode.numVoid,
        numGhost: mode.numGhost,
        gameName: campaignGame.name,
        gameId: this.gameId,
        health,
        breakSpeed,
      });
    } else if (mode.mode === GameMode.enum.Race) {
      gameState = createRaceGame({
        width: mode.worldWidth,
        height: mode.worldHeight,
        playerId: this.playerId,
        timeLimit: mode.timeLimit,
        numGreenCircles: mode.numGreenCircles,
        numGremlakShips: mode.numGremlakShips,
        numGravity: mode.numGravity,
        numHunter: mode.numHunter,
        numBlockade: mode.numBlockade,
        numVoid: mode.numVoid,
        numGhost: mode.numGhost,
        gameName: campaignGame.name,
        gameId: this.gameId,
        health,
        breakSpeed,
      });
    } else {
      gameState = createSurvivalGame({
        width: mode.worldWidth,
        height: mode.worldHeight,
        playerId: this.playerId,
        numGremlakShips: mode.numCircles || mode.numGremlakShips,
        numGravity: mode.numGravity,
        numHunter: mode.numHunter,
        numBlockade: mode.numBlockade,
        numGreenCircles: mode.numGreenCircles,
        numVoid: mode.numVoid,
        numGhost: mode.numGhost,
        health,
        breakSpeed,
      });
      gameState.id = this.gameId;
    }

    this.game = new Game(gameState);
    this.requestUpdate();

    // Wait for render then show intro modal
    await this.updateComplete;
    this.introModal?.open();
  }

  private startCampaignGame = async (): Promise<void> => {
    await this.introModal?.close();
    if (this.game) {
      this.startGameLoop();
    }
  };

  private handleCampaignGameOver(): void {
    if (!this.game || !this.campaignInstance) return;

    const player = this.game.state.players.find((p) => p.playerId === this.playerId);
    const isWin = player?.victory === Victory.enum.Win;

    if (isWin) {
      // Mark game as completed
      const gameIndex = this.campaignInstance.currentGameIndex;
      if (!this.campaignInstance.completedGameIndexes.includes(gameIndex)) {
        this.campaignInstance.completedGameIndexes.push(gameIndex);
      }
      this.campaignInstance.currentGameIndex = gameIndex + 1;
      saveActiveCampaign(this.campaignInstance, this.profileContext.currentProfile!.id);

      // Check if campaign is completed
      const campaign = getCampaignBySlug(this.campaignInstance.campaignSlug);
      if (campaign && this.campaignInstance.currentGameIndex >= campaign.games.length) {
        // Campaign defeated
        if (this.achievements && this.onAchievementsUpdate) {
          const updated = updateCampaignsDefeated(this.achievements, 1);
          const newUnlocks = updated.badges.filter((b) => {
            if (!b.unlocked) return false;
            const oldBadge = this.achievements!.badges.find((old) => old.badgeId === b.badgeId);
            return !oldBadge?.unlocked;
          });
          newUnlocks.forEach((badge) => {
            dispatch(this, BadgeUnlockedEvent({ badgeId: badge.badgeId, unlockedAt: badge.unlockedAt! }));
          });
          this.onAchievementsUpdate(updated);
        }
      }
    }

    this.campaignResult = isWin ? "win" : "lose";
    this.requestUpdate();

    // Wait for render then show result modal
    this.updateComplete.then(() => {
      this.resultModal?.open();
    });
  }

  private updateAchievementsOnGameOver(): void {
    if (!this.achievements || !this.onAchievementsUpdate) return;

    let updated = updateGamesPlayed(this.achievements, 1);

    // Green circles collected
    if (this.game) {
      updated = updateGreenCirclesCollected(updated, this.game.state.collected);
    }

    // Survival time
    if (this.game?.state.mode === GameMode.enum.Survival && this.game.state.started && this.game.state.ended) {
      const durationMinutes = Math.floor((this.game.state.ended - this.game.state.started) / 60000);
      updated = updateSurvivalTime(updated, durationMinutes);
    }

    // Check for new unlocks
    const newUnlocks = updated.badges.filter((b) => {
      if (!b.unlocked) return false;
      const oldBadge = this.achievements!.badges.find((old) => old.badgeId === b.badgeId);
      return !oldBadge?.unlocked;
    });
    newUnlocks.forEach((badge) => {
      dispatch(this, BadgeUnlockedEvent({ badgeId: badge.badgeId, unlockedAt: badge.unlockedAt! }));
    });

    this.onAchievementsUpdate(updated);
  }

  private continueCampaign = (): void => {
    if (!this.campaignGame?.upgrades) {
      dispatch(this, NavigationEvent({ path: `/campaigns/${this.instanceId}` }));
    } else {
      dispatch(this, NavigationEvent({ path: `/campaigns/${this.instanceId}/upgrade` }));
    }
  };

  private async initCustomGame(): Promise<void> {
    const customMode = loadCustomGameMode(this.modeName, this.profileContext.currentProfile!.id);
    if (!customMode) return;

    let gameState;
    if (customMode.mode === GameMode.enum.Survival) {
      gameState = createSurvivalGame({
        width: customMode.worldWidth,
        height: customMode.worldHeight,
        playerId: this.playerId,
        numGremlakShips: customMode.numGremlakShips,
        numGravity: customMode.numGravity,
        numHunter: customMode.numHunter,
        numBlockade: customMode.numBlockade,
        numGreenCircles: customMode.numGreenCircles,
        numVoid: customMode.numVoid,
        numGhost: customMode.numGhost,
        health: customMode.health,
      });
    } else if (customMode.mode === GameMode.enum.Adventure) {
      gameState = createAdventureGame({
        width: customMode.worldWidth,
        height: customMode.worldHeight,
        playerId: this.playerId,
        numGreenCircles: customMode.numGreenCircles,
        numGremlakShips: customMode.numGremlakShips,
        numGravity: customMode.numGravity,
        numHunter: customMode.numHunter,
        numBlockade: customMode.numBlockade,
        numVoid: customMode.numVoid,
        numGhost: customMode.numGhost,
        gameName: customMode.name,
        gameId: this.gameId,
        health: customMode.health,
      });
    } else if (customMode.mode === GameMode.enum.Race) {
      gameState = createRaceGame({
        width: customMode.worldWidth,
        height: customMode.worldHeight,
        playerId: this.playerId,
        timeLimit: customMode.timeLimit,
        numGreenCircles: customMode.numGreenCircles,
        numGremlakShips: customMode.numGremlakShips,
        numGravity: customMode.numGravity,
        numHunter: customMode.numHunter,
        numBlockade: customMode.numBlockade,
        numVoid: customMode.numVoid,
        numGhost: customMode.numGhost,
        gameName: customMode.name,
        gameId: this.gameId,
        health: customMode.health,
      });
    } else {
      return;
    }

    this.game = new Game(gameState);
    this.startGameLoop();
  }
  private retryCampaignGame = (): void => {
    const randomGameId = "campaign-" + Math.floor(Math.random() * 90000 + 10000);
    const randomPlayerId = crypto.randomUUID();
    const path = `/play/game/${randomGameId}/player/${randomPlayerId}?campaign=${this.instanceId}`;
    window.location.assign(path);
  };
  private goHome = (): void => {
    dispatch(this, NavigationEvent({ path: "/" }));
  };
}
