import { html, css, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-not-found-page")
export class CanzeltlyNotFoundPage extends LitElement {
  static override styles = [
    globalStyles,
    css`
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        text-align: center;
        padding: var(--size-xl);
      }

      .error-code {
        font-size: 96px;
        font-weight: var(--font-weight-bold);
        letter-spacing: var(--letter-spacing-tight);
        background: linear-gradient(135deg, var(--color-1-light), var(--color-1-dark));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        line-height: 1;
      }

      h1 {
        font-size: var(--font-xl);
        margin: var(--size-medium) 0;
      }

      .message {
        color: var(--color-primary-text-muted);
        font-size: var(--font-medium);
        margin-bottom: var(--size-xl);
        max-width: 400px;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p class="message">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/">
          <button class="primary">Back to Home</button>
        </a>
      </main>
    `;
  }
}
