import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";

@customElement("canzeltly-input")
export class CanzeltlyInput extends LitElement {
  @property({ type: String }) type: "number" | "slider" | "checkbox" | "dropdown" | "plaintext" = "plaintext";
  @property({ type: String }) label = "";
  @property() value: string | number | boolean = "";
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) step?: number;
  @property({ type: Array }) options?: string[]; // for dropdown

  static override styles = [
    globalStyles,
    css`
      .input-group {
        margin-bottom: var(--size-medium);
      }
      label {
        display: block;
        margin-bottom: var(--size-small);
      }
      input,
      select,
      textarea {
        width: 100%;
        padding: var(--size-small) var(--size-medium);
        font-size: var(--font-medium);
        border-radius: var(--border-radius-medium);
        border: var(--border-normal);
        background-color: var(--color-secondary-surface);
        color: var(--color-secondary-text);
      }
      input:focus,
      select:focus,
      textarea:focus {
        border: var(--border-active);
        box-shadow: var(--shadow-active);
        outline: none;
      }
      input[type="range"] {
        width: 100%;
      }
      input[type="checkbox"] {
        width: auto;
        margin-right: var(--size-small);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <div class="input-group">
        <label>${this.label}</label>
        ${this.renderInput()}
      </div>
    `;
  }

  private renderInput(): TemplateResult {
    switch (this.type) {
      case "number":
        return html`
          <input
            type="number"
            .value="${String(this.value)}"
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            @input="${this.handleInput}" />
        `;
      case "slider":
        return html`
          <div style="display: flex; align-items: center; gap: var(--size-small);">
            <input
              type="range"
              .value="${String(this.value)}"
              .min="${this.min}"
              .max="${this.max}"
              .step="${this.step}"
              @input="${this.handleInput}"
              style="flex: 1;" />
            <input
              type="number"
              .value="${String(this.value)}"
              .min="${this.min}"
              .max="${this.max}"
              .step="${this.step}"
              @input="${this.handleInput}"
              style="width: 80px;" />
          </div>
        `;
      case "checkbox":
        return html`
          <input type="checkbox" .checked="${Boolean(this.value)}" @change="${this.handleInput}" />
        `;
      case "dropdown":
        return html`
          <select @change="${this.handleInput}">
            ${this.options?.map(
              (opt) => html`
                <option value="${opt}" ?selected="${opt === this.value}">${opt}</option>
              `,
            )}
          </select>
        `;
      case "plaintext":
      default:
        return html`
          <input type="text" .value="${String(this.value)}" @input="${this.handleInput}" />
        `;
    }
  }

  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    let newValue: string | number | boolean;
    if (this.type === "checkbox") {
      newValue = (target as HTMLInputElement).checked;
    } else if (this.type === "number" || this.type === "slider") {
      newValue = Number(target.value);
    } else {
      newValue = target.value;
    }
    this.value = newValue;
    this.dispatchEvent(new CustomEvent("input-change", { detail: { value: newValue } }));
  }
}
