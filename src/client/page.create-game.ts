import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import "./component.create-game.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-create-game-page")
export class CanzeltlyCreateGamePage extends CanzeltlyAppProvider {
  static override styles = [globalStyles, css``];

  override render(): TemplateResult {
    return html`
      <button class="back-button" @click=${this.goHome}>Home</button>
      <canzeltly-create-game @game-created="${this.handleGameCreated}"></canzeltly-create-game>
    `;
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }

  private handleGameCreated(e: CustomEvent): void {
    const { id, playerId } = e.detail as { id: string; playerId: string };
    window.location.assign(`/play/game/${id}/player/${playerId}?newgame=true`);
  }
}
