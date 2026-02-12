import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { loadGameState } from "./util.storage.js";
import { GameState, GameStatus } from "../game/game.js";

@customElement("canzeltly-game-summary-page")
export class CanzeltlyGameSummaryPage extends CanzeltlyAppProvider {
  params = parseRouteParams("/summary/game/:gameId/player/:playerId", window.location.pathname);

  @state()
  gameState: GameState | null = null;

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: var(--size-600);
        margin: 0 auto;
        padding: var(--size-large);
        text-align: center;
      }

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--size-medium);
        margin: var(--size-large) 0;
      }

      .stat {
        background: var(--color-secondary-surface);
        padding: var(--size-medium);
        border-radius: var(--border-radius-medium);
      }

      .stat-label {
        font-size: var(--font-size-small);
        color: var(--color-secondary-text);
        margin-bottom: var(--size-small);
      }

      .stat-value {
        font-size: var(--font-size-large);
        font-weight: bold;
      }
    `,
  ];

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.gameState = loadGameState(this.params.gameId) || null;
  }

  override render(): TemplateResult {
    if (!this.gameState) {
      return html`
        <main>
          <h1>Game Not Found</h1>
          <p>The requested game could not be found.</p>
          <a href="/" class="standalone">Back to Home</a>
        </main>
      `;
    }

    const player = this.gameState.players.find((p) => p.playerId === this.params.playerId);
    const objectCount = this.gameState.layers[1].length;
    const gameDuration = this.gameState.duration ? Math.round(this.gameState.duration / 1000) : 0;
    const worldSize = `${this.gameState.world.width} × ${this.gameState.world.height}`;
    const victory = player?.victory || "Unknown";

    return html`
      <main>
        <h1>Game Summary</h1>
        <h2>${this.gameState.name}</h2>

        <div class="stats">
          <div class="stat">
            <div class="stat-label">Objects</div>
            <div class="stat-value">${objectCount}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Duration</div>
            <div class="stat-value">${gameDuration}s</div>
          </div>
          <div class="stat">
            <div class="stat-label">World Size</div>
            <div class="stat-value">${worldSize}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Result</div>
            <div class="stat-value">${victory}</div>
          </div>
        </div>

        <a href="/" class="standalone">Back to Home</a>
        ${this.gameState.status !== GameStatus.enum.GameOver
          ? html`
              <a href="/play/game/${this.params.gameId}/player/${this.params.playerId}" class="standalone secondary">
                Continue Game
              </a>
            `
          : ""}
      </main>
    `;
  }
}
