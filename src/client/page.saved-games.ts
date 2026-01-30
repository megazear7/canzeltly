import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyGamesProvider } from "./provider.games.js";
import "./component.saved-games-list.js";

@customElement("canzeltly-saved-games-page")
export class CanzeltlySavedGamesPage extends CanzeltlyGamesProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--size-large);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <canzeltly-saved-games-list></canzeltly-saved-games-list>
      </main>
    `;
  }
}
