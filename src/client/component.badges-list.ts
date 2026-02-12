import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { Achievements } from "../shared/type.achievement.js";
import "./component.badge.js";

@customElement("canzeltly-badges-list")
export class CanzeltlyBadgesList extends LitElement {
  @property({ type: Object }) achievements!: Achievements;

  static override styles = [
    globalStyles,
    css`
      .badges-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--size-medium);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="badges-list">
        ${this.achievements.badges.map(
          (badgeProgress) => html`
            <canzeltly-badge .badgeProgress=${badgeProgress}></canzeltly-badge>
          `,
        )}
      </div>
    `;
  }
}
