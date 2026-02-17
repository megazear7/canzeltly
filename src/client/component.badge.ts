import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { BadgeProgress } from "../shared/type.badge.js";
import { getBadgeById } from "../shared/util.achievements.js";

@customElement("canzeltly-badge")
export class CanzeltlyBadge extends LitElement {
  @property({ type: Object }) badgeProgress!: BadgeProgress;

  static override styles = [
    globalStyles,
    css`
      .badge {
        display: flex;
        align-items: center;
        padding: var(--size-medium) var(--size-large);
        border-radius: var(--border-radius-medium);
        border: var(--border-subtle);
        background-color: var(--color-secondary-surface);
        margin-bottom: var(--size-small);
        transition: var(--transition-all);
        box-shadow: var(--shadow-normal);
      }
      .badge:hover {
        transform: var(--transform-hover);
        box-shadow: var(--shadow-hover);
      }
      .badge.unlocked {
        background-color: var(--color-success-light);
        border-color: var(--color-success);
      }
      .badge-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: var(--color-tertiary-surface);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--size-medium);
        font-size: var(--font-large);
        color: var(--color-primary-text);
        flex-shrink: 0;
      }
      .badge.unlocked .badge-icon {
        background-color: var(--color-success);
      }
      .badge-content {
        flex: 1;
      }
      .badge-name {
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--size-tiny);
      }
      .badge-description {
        font-size: var(--font-small);
        color: var(--color-secondary-text);
        margin-bottom: var(--size-small);
      }
      .badge-progress {
        font-size: var(--font-small);
        color: var(--color-secondary-text);
      }
      .badge.unlocked .badge-progress {
        color: var(--color-success);
      }
    `,
  ];

  override render(): TemplateResult {
    const badge = getBadgeById(this.badgeProgress.badgeId);
    if (!badge) return html``;

    const isUnlocked = this.badgeProgress.unlocked;
    const progressText = isUnlocked ? "Unlocked!" : `${this.badgeProgress.current} / ${badge.threshold}`;

    return html`
      <div class="badge ${isUnlocked ? "unlocked" : ""}">
        <div class="badge-icon">${badge.icon || "🏆"}</div>
        <div class="badge-content">
          <div class="badge-name">${badge.name}</div>
          <div class="badge-description">${badge.description}</div>
          <div class="badge-progress">${progressText}</div>
        </div>
      </div>
    `;
  }
}
