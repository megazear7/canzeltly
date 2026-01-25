import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { CanzeltlyAppProvider } from "./provider.app.js";

@customElement("canzeltly-play-page")
export class CanzeltlyPlayPage extends CanzeltlyAppProvider {
  params = parseRouteParams("/play/:id", window.location.pathname);

  override render(): TemplateResult {
    return html`
      <canzeltly-play .name="${this.params.id}"></canzeltly-play>
    `;
  }
}
