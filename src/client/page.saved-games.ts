import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyGamesProvider } from "./provider.games.js";
import { NavigationEvent } from "../client/event.navigation.js";
import { dispatch } from "../client/util.events.js";
import "./component.games-list.js";

@customElement("canzeltly-saved-games-page")
export class CanzeltlySavedGamesPage extends CanzeltlyGamesProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        max-width: var(--size-800);
        margin: 0 auto;
        padding: var(--size-large);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <canzeltly-games-list></canzeltly-games-list>
      </main>
    `;
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
