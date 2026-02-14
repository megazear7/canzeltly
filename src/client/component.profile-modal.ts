import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { componentStyles } from "./styles.component.js";
import { ProfileContext, profileContext } from "./context.js";
import { Profile, ProfileId } from "../shared/type.profile.js";

@customElement("canzeltly-profile-modal")
export class CanzeltlyProfileModal extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  static override styles = [
    globalStyles,
    componentStyles,
    css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
      }

      .modal-content {
        background: var(--color-primary-surface);
        border-radius: var(--border-radius-large);
        padding: var(--size-large);
        max-width: 400px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 2px solid var(--color-primary-text);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--size-large);
      }

      .modal-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--color-primary-text);
        margin: 0;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--color-primary-text);
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-small);
        transition: background-color 0.2s ease;
      }

      .close-button:hover {
        background: var(--color-secondary-surface);
      }

      .profile-list {
        display: flex;
        flex-direction: column;
        gap: var(--size-medium);
      }

      .profile-item {
        display: flex;
        align-items: center;
        gap: var(--size-medium);
        padding: var(--size-medium);
        border-radius: var(--border-radius-medium);
        background: var(--color-secondary-surface);
        cursor: pointer;
        transition: background-color 0.2s ease;
        border: 2px solid transparent;
      }

      .profile-item:hover {
        background: var(--color-tertiary-surface);
      }

      .profile-item.active {
        border-color: var(--color-accent);
        background: var(--color-accent-surface);
      }

      .profile-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--profile-primary), var(--profile-secondary));
        border: 2px solid var(--color-primary-text);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--color-primary-text);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
      }

      .profile-info {
        flex: 1;
        min-width: 0;
      }

      .profile-name {
        font-weight: bold;
        color: var(--color-primary-text);
        margin-bottom: var(--size-small);
      }

      .profile-created {
        font-size: 12px;
        color: var(--color-secondary-text);
      }

      .profile-actions {
        display: flex;
        gap: var(--size-small);
      }

      .action-button {
        padding: var(--size-small) var(--size-medium);
        border: none;
        border-radius: var(--border-radius-small);
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      .switch-button {
        background: var(--color-accent);
        color: var(--color-accent-text);
      }

      .switch-button:hover {
        background: var(--color-accent-hover);
      }

      .delete-button {
        background: var(--color-error);
        color: white;
      }

      .delete-button:hover {
        background: var(--color-error-hover);
      }

      .create-profile-button {
        width: 100%;
        padding: var(--size-medium);
        background: var(--color-success);
        color: white;
        border: none;
        border-radius: var(--border-radius-medium);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: var(--size-large);
        transition: background-color 0.2s ease;
      }

      .create-profile-button:hover {
        background: var(--color-success-hover);
      }

      .initials {
        font-size: 16px;
        line-height: 1;
      }
    `,
  ];

  public handleCreateProfile(): void {
    this.dispatchEvent(
      new CustomEvent("show-create-profile-modal", {
        bubbles: true,
        composed: true,
      }),
    );
  }
  private getProfileInitials(name: string): string {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  }

  override render(): TemplateResult {
    const currentProfile = this.profileContext.currentProfile;
    return html`
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Profile Settings</h2>
          <button class="close-button" @click=${this.handleClose}>&times;</button>
        </div>

        ${currentProfile ? this.renderCurrentProfileSettings(currentProfile) : ""}

        <div class="profile-list">
          ${this.profileContext.profiles.map((profile) => this.renderProfileItem(profile))}
        </div>

        <button class="create-profile-button" @click=${this.handleCreateProfile}>Create New Profile</button>
      </div>
    `;
  }

  private renderCurrentProfileSettings(profile: Profile): TemplateResult {
    return html`
      <div class="current-profile-settings">
        <h3>Current Profile: ${profile.name}</h3>
        <div class="setting">
          <label for="draw-mode">Draw Mode:</label>
          <select id="draw-mode" .value=${profile.drawMode} @change=${this.handleDrawModeChange}>
            <option value="simple">Simple</option>
            <option value="graphical">Graphical</option>
          </select>
        </div>
      </div>
    `;
  }

  private renderProfileItem(profile: Profile): TemplateResult {
    const isActive = this.profileContext.currentProfile?.id === profile.id;
    const initials = this.getProfileInitials(profile.name);
    const createdDate = profile.createdAt.toLocaleDateString();

    return html`
      <div
        class="profile-item ${isActive ? "active" : ""}"
        @click=${() => this.handleSwitchProfile(profile.id)}
        style="
          --profile-primary: ${profile.primaryColor};
          --profile-secondary: ${profile.secondaryColor};
        ">
        <div class="profile-circle">
          <span class="initials">${initials}</span>
        </div>
        <div class="profile-info">
          <div class="profile-name">${profile.name}</div>
          <div class="profile-created">Created ${createdDate}</div>
        </div>
        <div class="profile-actions">
          ${!isActive
            ? html`
                <button
                  class="action-button switch-button"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.handleSwitchProfile(profile.id);
                  }}>
                  Switch
                </button>
              `
            : ""}
          ${this.profileContext.profiles.length > 1
            ? html`
                <button
                  class="action-button delete-button"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.handleDeleteProfile(profile.id);
                  }}>
                  Delete
                </button>
              `
            : ""}
        </div>
      </div>
    `;
  }

  private handleClose(): void {
    this.dispatchEvent(
      new CustomEvent("hide-profile-modal", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleSwitchProfile(profileId: ProfileId): void {
    this.dispatchEvent(
      new CustomEvent("switch-profile", {
        detail: { profileId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleDeleteProfile(profileId: ProfileId): void {
    if (confirm("Are you sure you want to delete this profile? All associated data will be lost.")) {
      this.dispatchEvent(
        new CustomEvent("delete-profile", {
          detail: { profileId },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private handleDrawModeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newDrawMode = select.value as "simple" | "graphical";
    this.dispatchEvent(
      new CustomEvent("update-profile-draw-mode", {
        detail: { drawMode: newDrawMode },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
