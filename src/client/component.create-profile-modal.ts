import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { componentStyles } from "./styles.component.js";
import { ProfileContext, profileContext } from "./context.js";

@customElement("canzeltly-create-profile-modal")
export class CanzeltlyCreateProfileModal extends LitElement {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  profileContext!: ProfileContext;

  @query("input[name='profile-name']")
  nameInput!: HTMLInputElement;

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
        border: 2px solid var(--color-primary-text);
      }

      .modal-header {
        text-align: center;
        margin-bottom: var(--size-large);
      }

      .modal-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--color-primary-text);
        margin: 0 0 var(--size-small) 0;
      }

      .modal-subtitle {
        color: var(--color-secondary-text);
        font-size: 14px;
        margin: 0;
      }

      .form-group {
        margin-bottom: var(--size-large);
      }

      .form-label {
        display: block;
        font-weight: bold;
        color: var(--color-primary-text);
        margin-bottom: var(--size-small);
      }

      .form-input {
        width: 100%;
        padding: var(--size-medium);
        border: 2px solid var(--color-secondary-surface);
        border-radius: var(--border-radius-medium);
        background: var(--color-secondary-surface);
        color: var(--color-primary-text);
        font-size: 16px;
        transition: border-color 0.2s ease;
      }

      .form-input:focus {
        outline: none;
        border-color: var(--color-accent);
      }

      .color-preview {
        display: flex;
        align-items: center;
        gap: var(--size-medium);
        margin-top: var(--size-medium);
      }

      .color-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--color-primary-text);
        flex-shrink: 0;
      }

      .color-info {
        flex: 1;
      }

      .color-label {
        font-size: 12px;
        color: var(--color-secondary-text);
        margin-bottom: var(--size-small);
      }

      .regenerate-colors {
        background: none;
        border: none;
        color: var(--color-accent);
        cursor: pointer;
        font-size: 14px;
        text-decoration: underline;
        padding: 0;
      }

      .regenerate-colors:hover {
        color: var(--color-accent-hover);
      }

      .button-group {
        display: flex;
        gap: var(--size-medium);
        margin-top: var(--size-large);
      }

      .button {
        flex: 1;
        padding: var(--size-medium);
        border: none;
        border-radius: var(--border-radius-medium);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .create-button {
        background: var(--color-success);
        color: white;
      }

      .create-button:hover {
        background: var(--color-success-hover);
      }

      .create-button:disabled {
        background: var(--color-secondary-surface);
        color: var(--color-secondary-text);
        cursor: not-allowed;
      }

      .cancel-button {
        background: var(--color-secondary-surface);
        color: var(--color-primary-text);
      }

      .cancel-button:hover {
        background: var(--color-tertiary-surface);
      }

      .error-message {
        color: var(--color-error);
        font-size: 14px;
        margin-top: var(--size-small);
        display: block;
      }
    `,
  ];

  private primaryColor = this.generateRandomColor();
  private secondaryColor = this.generateRandomColor();
  private errorMessage = "";

  private generateRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
    const lightness = 40 + Math.floor(Math.random() * 20); // 40-60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  override render(): TemplateResult {
    return html`
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Create New Profile</h2>
          <p class="modal-subtitle">Enter a name for your new profile</p>
        </div>

        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label class="form-label" for="profile-name">Profile Name</label>
            <input
              type="text"
              id="profile-name"
              name="profile-name"
              class="form-input"
              placeholder="Enter profile name"
              required
              maxlength="50"
              @input=${this.handleNameInput} />
            ${this.errorMessage
              ? html`
                  <span class="error-message">${this.errorMessage}</span>
                `
              : ""}
          </div>

          <div class="color-preview">
            <div
              class="color-circle"
              style="background: linear-gradient(135deg, ${this.primaryColor}, ${this.secondaryColor})"></div>
            <div class="color-info">
              <div class="color-label">Profile Colors</div>
              <button type="button" class="regenerate-colors" @click=${this.regenerateColors}>
                Generate New Colors
              </button>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="button cancel-button" @click=${this.handleCancel}>Cancel</button>
            <button type="submit" class="button create-button" ?disabled=${!this.isFormValid()}>Create Profile</button>
          </div>
        </form>
      </div>
    `;
  }

  override firstUpdated(): void {
    // Focus the input when the modal opens
    setTimeout(() => {
      if (this.nameInput) {
        this.nameInput.focus();
      }
    }, 100);
  }

  private handleNameInput(): void {
    this.errorMessage = "";
    this.requestUpdate();
  }

  private regenerateColors(): void {
    this.primaryColor = this.generateRandomColor();
    this.secondaryColor = this.generateRandomColor();
    this.requestUpdate();
  }

  private isFormValid(): boolean {
    const name = this.nameInput?.value?.trim();
    return !!(name && name.length >= 1 && name.length <= 50);
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    const name = this.nameInput.value.trim();
    if (!name) {
      this.errorMessage = "Profile name is required";
      return;
    }

    if (name.length > 50) {
      this.errorMessage = "Profile name must be 50 characters or less";
      return;
    }

    // Check if profile name already exists
    const existingProfile = this.profileContext.profiles.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (existingProfile) {
      this.errorMessage = "A profile with this name already exists";
      return;
    }

    this.dispatchEvent(
      new CustomEvent("create-profile", {
        detail: {
          name,
          primaryColor: this.primaryColor,
          secondaryColor: this.secondaryColor,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleCancel(): void {
    this.dispatchEvent(
      new CustomEvent("hide-create-profile-modal", {
        bubbles: true,
        composed: true,
      }),
    );
  }
}
