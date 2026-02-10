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
      }
    `,
  ];

  override render(): TemplateResult {
    const randomGameId = "quickstart-" + Math.floor(Math.random() * 90000) + 10000;
    const randomPlayerId = crypto.randomUUID();
    return html`
      <main>
        <img src="/logo/logo-512x512.png" alt="Canzeltly Logo" width="200" />
        <h1>Canzeltly</h1>
        <p>
          <a href="/play/game/${randomGameId}/player/${randomPlayerId}?newgame=true" class="standalone">Quick Start</a>
        </p>
        <p><a href="/create-game" class="standalone">Create Game</a></p>
        <p><a href="/saved-games" class="standalone">Saved Games</a></p>
        <p><a href="/custom-game-modes" class="standalone">Custom Game Modes</a></p>
        <p><a href="/campaigns/start" class="standalone">Start New Campaign</a></p>
        <p><a href="/campaigns/continue" class="standalone">Continue Campaign</a></p>
      </main>
    `;
  }
}
