import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { CanzeltlyAppProvider } from "./provider.app.js";

@customElement("canzeltly-play-page")
export class CanzeltlyPlayPage extends CanzeltlyAppProvider {
  params = parseRouteParams("/play/game/:gameId/player/:playerId", window.location.pathname);
  isNewGame = new URLSearchParams(window.location.search).get("newgame") === "true";

  override render(): TemplateResult {
    return html`
      <canzeltly-play
        .gameId="${this.params.gameId}"
        .playerId="${this.params.playerId}"
        .isNewGame="${this.isNewGame}"></canzeltly-play>
    `;
  }
}
