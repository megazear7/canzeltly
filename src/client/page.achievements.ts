import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import "./component.badge-progress.js";
import "./component.badges-list.js";

@customElement("canzeltly-achievements-page")
export class CanzeltlyAchievementsPage extends CanzeltlyAppProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        max-width: var(--size-800);
        margin: 0 auto;
        padding: var(--size-large);
      }
      h1 {
        text-align: center;
        margin-bottom: var(--size-xl);
        background: linear-gradient(135deg, var(--color-1-light), var(--color-1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .progress-section {
        margin-bottom: var(--size-xl);
        background: var(--color-secondary-surface);
        padding: var(--size-large);
        border-radius: var(--border-radius-medium);
        border: var(--border-subtle);
        box-shadow: var(--shadow-normal);
      }
    `,
  ];

  override render(): TemplateResult {
    const achievements = this.appContext.achievements;
    if (!achievements) {
      return html`
        <main><p>Loading achievements...</p></main>
      `;
    }

    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>Achievements</h1>
        <div class="progress-section">
          <canzeltly-badge-progress .achievements=${achievements}></canzeltly-badge-progress>
        </div>
        <canzeltly-badges-list .achievements=${achievements}></canzeltly-badges-list>
      </main>
    `;
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
