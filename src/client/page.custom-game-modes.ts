import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCustomGameModesProvider } from "./provider.custom-game-modes.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import "./component.custom-game-modes-list.js";

@customElement("canzeltly-custom-game-modes-page")
export class CanzeltlyCustomGameModesPage extends CanzeltlyCustomGameModesProvider {
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
        <button class="back-button" @click=${this.goHome}>Home</button>
        <canzeltly-custom-game-modes-list></canzeltly-custom-game-modes-list>
      </main>
    `;
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
