import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-not-found-page")
export class CanzeltlyNotFoundPage extends LitElement {
  static override styles = [globalStyles];

  override render(): TemplateResult {
    return html`
      <main>
        <h1>Not Found!</h1>
      </main>
    `;
  }
}
