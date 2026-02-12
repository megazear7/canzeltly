import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCampaignsProvider } from "./provider.campaigns.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { getCampaignBySlug } from "../shared/data.campaigns.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { getCampaignInstance } from "./util.storage.js";
import { checkIcon } from "./icons.js";

@customElement("canzeltly-campaign-games-page")
export class CanzeltlyCampaignGamesPage extends CanzeltlyCampaignsProvider {
  params = parseRouteParams("/campaigns/:instanceId", window.location.pathname);

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--size-large);
      }

      .game-list {
        display: flex;
        flex-direction: column;
        gap: var(--size-medium);
      }

      .game-item {
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-medium);
        padding: var(--size-medium) var(--size-large);
        box-shadow: var(--shadow-normal);
        display: flex;
        align-items: center;
        gap: var(--size-medium);
      }

      .game-item.completed {
        opacity: 0.8;
      }

      .game-item.locked {
        opacity: 0.4;
      }

      .game-item.next {
        border: 2px solid var(--color-1);
      }

      .check-icon {
        color: var(--color-1);
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }

      .game-info {
        flex: 1;
      }

      .game-name {
        font-weight: bold;
        font-size: var(--font-medium);
      }

      .game-mode {
        color: var(--color-secondary-text-muted);
        font-size: var(--font-small);
      }

      .hero-stats {
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-medium);
        padding: var(--size-medium) var(--size-large);
        margin-bottom: var(--size-large);
        box-shadow: var(--shadow-normal);
      }

      .stats-grid {
        display: flex;
        gap: var(--size-large);
        margin-top: var(--size-small);
      }

      .stat {
        text-align: center;
      }

      .stat-value {
        font-size: var(--font-large);
        font-weight: bold;
        color: var(--color-1);
      }

      .stat-label {
        font-size: var(--font-small);
        color: var(--color-secondary-text-muted);
      }

      .campaign-complete {
        text-align: center;
        padding: var(--size-xl);
        color: var(--color-success);
        font-size: var(--font-large);
      }
    `,
  ];

  override render(): TemplateResult {
    const instanceId = this.params.instanceId;
    const instance = getCampaignInstance(instanceId);
    const campaign = instance ? getCampaignBySlug(instance.campaignSlug) : undefined;

    if (!campaign || !instance) {
      return html`
        <main>
          <button class="back-button" @click=${this.goHome}>Home</button>
          <h1>Campaign not found</h1>
          <p>This campaign does not exist or has not been started.</p>
        </main>
      `;
    }

    const completedIndexes = instance.completedGameIndexes;
    const nextGameIndex = instance.currentGameIndex;
    const allCompleted = completedIndexes.length === campaign.games.length;

    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>${campaign.name}</h1>
        <p>${campaign.description}</p>

        <div class="hero-stats">
          <h2>Hero Stats</h2>
          <div class="stats-grid">
            <div class="stat">
              <div class="stat-value">${instance.heroStats.health}</div>
              <div class="stat-label">Health</div>
            </div>
            <div class="stat">
              <div class="stat-value">${instance.heroStats.maxSpeed.toFixed(1)}</div>
              <div class="stat-label">Max Speed</div>
            </div>
            <div class="stat">
              <div class="stat-value">${instance.heroStats.acceleration.toFixed(2)}</div>
              <div class="stat-label">Acceleration</div>
            </div>
          </div>
        </div>

        ${allCompleted
          ? html`
              <div class="campaign-complete">Campaign Complete! Congratulations!</div>
            `
          : html``}

        <div class="game-list">
          ${campaign.games.map((game, index) => {
            const isCompleted = completedIndexes.includes(index);
            const isNext = index === nextGameIndex && !allCompleted;
            const isLocked = !isCompleted && !isNext;

            return html`
              <div
                class="game-item ${isCompleted ? "completed" : ""} ${isNext ? "next" : ""} ${isLocked ? "locked" : ""}">
                ${isCompleted
                  ? html`
                      <span class="check-icon">${checkIcon}</span>
                    `
                  : html`
                      <span style="width:24px"></span>
                    `}
                <div class="game-info">
                  <div class="game-name">${game.name}</div>
                  <div class="game-mode">${game.mode.mode} mode</div>
                </div>
                ${isNext
                  ? html`
                      <button class="primary" @click=${() => this.playGame(instanceId)}>Play</button>
                    `
                  : html``}
              </div>
            `;
          })}
        </div>
      </main>
    `;
  }

  private playGame(instanceId: string): void {
    const randomGameId = "campaign-" + Math.floor(Math.random() * 90000 + 10000);
    const randomPlayerId = crypto.randomUUID();
    dispatch(
      this,
      NavigationEvent({
        path: `/play/game/${randomGameId}/player/${randomPlayerId}?campaign=${instanceId}`,
      }),
    );
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
