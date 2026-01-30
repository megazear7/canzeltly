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
    return html`
      <main>
        <img src="/logo/logo-512x512.png" alt="Canzeltly Logo" width="200" />
        <h1>Canzeltly</h1>
        <p><a href="/create-game" class="standalone">Create Game</a></p>
        <p><a href="/play/123" class="standalone">Quickstart a Game</a></p>
      </main>
    `;
  }
}
