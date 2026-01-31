import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import "./component.create-game.js";

@customElement("canzeltly-create-game-page")
export class CanzeltlyCreateGamePage extends CanzeltlyAppProvider {
  override render(): TemplateResult {
    return html`
      <canzeltly-create-game @game-created="${this.handleGameCreated}"></canzeltly-create-game>
    `;
  }

  private handleGameCreated(e: CustomEvent): void {
    const { id, playerId } = e.detail as { id: string; playerId: string };
    window.location.assign(`/play/game/${id}/player/${playerId}`);
  }
}
