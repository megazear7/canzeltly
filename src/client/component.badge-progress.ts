import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { Achievements } from "../shared/type.achievement.js";
import { getTotalBadges, getUnlockedBadgesCount } from "../shared/util.achievements.js";

@customElement("canzeltly-badge-progress")
export class CanzeltlyBadgeProgress extends LitElement {
  @property({ type: Object }) achievements!: Achievements;

  static override styles = [
    globalStyles,
    css`
      .progress-container {
        margin-bottom: var(--size-medium);
      }
      .progress-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--size-small);
        font-size: var(--font-small);
      }
      .progress-bar {
        width: 100%;
        height: 10px;
        background-color: var(--color-secondary-surface);
        border-radius: var(--border-radius-pill);
        overflow: hidden;
        border: var(--border-subtle);
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-success), var(--color-2-light));
        transition: width var(--time-slow) var(--ease-out);
        border-radius: var(--border-radius-pill);
      }
    `,
  ];

  override render(): TemplateResult {
    const total = getTotalBadges();
    const unlocked = getUnlockedBadgesCount(this.achievements);
    const percentage = total > 0 ? (unlocked / total) * 100 : 0;

    return html`
      <div class="progress-container">
        <div class="progress-label">
          <span>Badges Collected</span>
          <span>${unlocked} / ${total}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }
}
