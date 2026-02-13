import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { ProfileContext, profileContext } from "./context.js";

@customElement("canzeltly-profile-circle")
export class CanzeltlyProfileCircle extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  static override styles = [
    globalStyles,
    css`
      :host {
        position: fixed;
        top: var(--size-medium);
        right: var(--size-medium);
        z-index: 1000;
        display: block;
        cursor: pointer;
        user-select: none;
      }

      .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--size-small);
      }

      .profile-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--profile-primary), var(--profile-secondary));
        border: 3px solid var(--color-primary-text);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--color-primary-text);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        position: relative;
        transition: transform 0.2s ease;
      }

      .profile-circle:hover {
        transform: scale(1.05);
      }

      .badge-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--color-accent);
        color: var(--color-accent-text);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        border: 2px solid var(--color-primary-text);
      }

      .profile-name {
        font-size: 12px;
        color: var(--color-primary-text);
        text-align: center;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgba(0, 0, 0, 0.7);
        padding: 2px 6px;
        border-radius: var(--border-radius-small);
      }

      .initials {
        font-size: 18px;
        line-height: 1;
      }
    `,
  ];

  private getProfileInitials(name: string): string {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  }

  private getTotalBadges(): number {
    if (!this.profileContext.currentProfile) return 0;
    // This would need to be calculated from achievements
    // For now, return 0 - will be updated when achievements are integrated
    return 0;
  }

  override render(): TemplateResult {
    const profile = this.profileContext.currentProfile;
    if (!profile) return html``;

    const initials = this.getProfileInitials(profile.name);
    const badgeCount = this.getTotalBadges();

    return html`
      <div
        class="profile-container"
        @click=${this.handleClick}
        style="
          --profile-primary: ${profile.primaryColor};
          --profile-secondary: ${profile.secondaryColor};
        ">
        <div class="profile-circle">
          <span class="initials">${initials}</span>
          ${badgeCount > 0
            ? html`
                <div class="badge-count">${badgeCount}</div>
              `
            : ""}
        </div>
        <div class="profile-name">${profile.name}</div>
      </div>
    `;
  }

  private handleClick(): void {
    // Dispatch event to show profile modal
    this.dispatchEvent(
      new CustomEvent("show-profile-modal", {
        bubbles: true,
        composed: true,
      }),
    );
  }
}
