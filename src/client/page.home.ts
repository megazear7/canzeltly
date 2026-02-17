import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";

@customElement("canzeltly-home-page")
export class CanzeltlyHomePage extends CanzeltlyAppProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        text-align: center;
        padding: var(--size-xl) var(--size-large);
        max-width: var(--size-800);
      }

      .hero {
        margin-bottom: var(--size-2x);
      }

      .hero img {
        width: 140px;
        height: 140px;
        margin-bottom: var(--size-medium);
        filter: drop-shadow(0 4px 20px rgba(231, 80, 44, 0.3));
      }

      .hero h1 {
        font-size: 36px;
        font-weight: var(--font-weight-bold);
        letter-spacing: var(--letter-spacing-tight);
        margin: 0 0 var(--size-small) 0;
        background: linear-gradient(135deg, var(--color-1-light), var(--color-1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero p {
        color: var(--color-primary-text-muted);
        font-size: var(--font-small);
        margin: 0;
      }

      .quick-start {
        margin-bottom: var(--size-xl);
      }

      .quick-start a {
        display: inline-flex;
        align-items: center;
        gap: var(--size-small);
        padding: var(--size-medium) var(--size-xl);
        background: var(--color-1);
        color: var(--color-primary-text);
        font-size: var(--font-medium);
        font-weight: var(--font-weight-semibold);
        border-radius: var(--border-radius-pill);
        box-shadow: var(--shadow-normal), var(--shadow-glow-1);
        transition: var(--transition-all);
        text-decoration: none;
      }

      .quick-start a:hover {
        box-shadow: var(--shadow-hover), var(--shadow-glow-1);
        color: var(--color-primary-text);
        background: var(--color-1-light);
      }

      .quick-start a::after {
        display: none;
      }

      .nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--size-medium);
        text-align: left;
      }

      .nav-card {
        display: flex;
        flex-direction: column;
        gap: var(--size-small);
        padding: var(--size-large);
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-medium);
        border: var(--border-subtle);
        box-shadow: var(--shadow-normal);
        transition: var(--transition-all);
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }

      .nav-card:hover {
        box-shadow: var(--shadow-hover);
        border-color: var(--color-1);
        background: var(--color-secondary-surface-hover);
        color: inherit;
      }

      .nav-card::after {
        display: none;
      }

      .nav-card .card-title {
        font-size: var(--font-medium);
        font-weight: var(--font-weight-semibold);
        color: var(--color-primary-text);
      }

      .nav-card .card-desc {
        font-size: var(--font-tiny);
        color: var(--color-primary-text-muted);
        line-height: 1.4;
        margin: 0;
      }
    `,
  ];

  override render(): TemplateResult {
    const randomGameId = "quickstart-" + Math.floor(Math.random() * 90000) + 10000;
    const randomPlayerId = crypto.randomUUID();
    return html`
      <main>
        <div class="hero">
          <img src="/logo/logo-512x512.png" alt="Canzeltly Logo" />
          <h1>Canzeltly</h1>
          <p>A space adventure game</p>
        </div>

        <div class="quick-start">
          <a href="/play/game/${randomGameId}/player/${randomPlayerId}?newgame=true">&#9654; Quick Start</a>
        </div>

        <div class="nav-grid">
          <a href="/create-game" class="nav-card">
            <span class="card-title">Create Game</span>
            <p class="card-desc">Customize your own game with specific settings</p>
          </a>
          <a href="/saved-games" class="nav-card">
            <span class="card-title">Saved Games</span>
            <p class="card-desc">Resume or manage your saved game sessions</p>
          </a>
          <a href="/custom-game-modes" class="nav-card">
            <span class="card-title">Custom Game Modes</span>
            <p class="card-desc">Browse and play community-created game modes</p>
          </a>
          <a href="/campaigns/start" class="nav-card">
            <span class="card-title">Start Campaign</span>
            <p class="card-desc">Begin a new story-driven multi-mission journey</p>
          </a>
          <a href="/campaigns/continue" class="nav-card">
            <span class="card-title">Continue Campaign</span>
            <p class="card-desc">Pick up where you left off in your campaign</p>
          </a>
          <a href="/achievements" class="nav-card">
            <span class="card-title">Achievements</span>
            <p class="card-desc">Track your badges and unlocked milestones</p>
          </a>
        </div>
      </main>
    `;
  }
}
