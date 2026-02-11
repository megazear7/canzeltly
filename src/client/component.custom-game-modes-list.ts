import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { CustomGameModesContext, customGameModesContext } from "./context.js";
import { CanzeltlyModal } from "./component.modal.js";
import { ModelSubmitEventName } from "./event.modal-submit.js";
import { DeleteCustomModesEvent } from "./event.delete-custom-modes.js";
import { dispatch } from "./util.events.js";
import { NavigationEvent } from "./event.navigation.js";
import { LoadingStatus } from "../shared/type.loading.js";

@customElement("canzeltly-custom-game-modes-list")
export class CanzeltlyCustomGameModesList extends LitElement {
  @consume({ context: customGameModesContext })
  @state()
  customGameModesContext!: CustomGameModesContext;

  @state()
  selectedNames: string[] = [];

  @state()
  selectAll: boolean = false;

  @state()
  selectedCount: number = 0;

  @state()
  modalContent: TemplateResult | null = null;

  @state()
  currentModeName: string | null = null;

  @query("canzeltly-modal")
  modal!: CanzeltlyModal;

  static override styles = [
    globalStyles,
    css`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--size-large);
      }
      .modes-list {
        display: flex;
        flex-direction: column;
      }
      .mode-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--size-medium);
        border: 1px solid var(--color-border);
        margin-bottom: var(--size-small);
        border-radius: var(--border-radius);
      }
      .mode-name {
        font-weight: bold;
      }
      .actions {
        display: flex;
        gap: var(--size-small);
      }
      .kebab-menu {
        background: none;
        border: none;
        font-size: var(--font-large);
        cursor: pointer;
        padding: var(--size-small);
        border-radius: var(--border-radius-small);
      }
      .kebab-menu:hover {
        background-color: var(--color-hover);
      }
    `,
  ];

  override render(): TemplateResult {
    const { status, modes } = this.customGameModesContext;

    let content: TemplateResult;
    if (status === LoadingStatus.enum.loading) {
      content = html`
        <p>Loading custom game modes...</p>
      `;
    } else if (status === LoadingStatus.enum.error) {
      content = html`
        <p>Error loading custom game modes.</p>
      `;
    } else if (modes.length === 0) {
      content = html`
        <p>No custom game modes found.</p>
      `;
    } else {
      content = html`
        <div class="modes-list">
          ${modes.map(
            (mode) => html`
              <div class="mode-item">
                <label>
                  <input
                    type="checkbox"
                    .checked=${this.selectedNames.includes(mode.name)}
                    @change=${() => this.toggleSelection(mode.name)} />
                  <span class="mode-name">${mode.name}</span>
                </label>
                <button @click=${() => this.handleDirectPlay(mode.name)}>Play</button>
                <button class="kebab-menu" @click=${() => this.handleOpenModeOptions(mode.name)}>⋮</button>
              </div>
            `,
          )}
        </div>
      `;
    }

    return html`
      <div class="header">
        <h1>Custom Game Modes</h1>
        <div>
          <label>
            <input type="checkbox" .checked=${this.selectAll} @change=${this.handleSelectAll} />
            Select All
          </label>
          <button class="warning" ?disabled=${this.selectedCount === 0} @click=${this.handleDeleteSelected}>
            Delete (${this.selectedCount})
          </button>
        </div>
      </div>
      ${content}
      <canzeltly-modal>
        <div slot="body">${this.modalContent}</div>
      </canzeltly-modal>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  private handleEdit(name: string): void {
    dispatch(this, NavigationEvent({ path: `/create-game?mode=${encodeURIComponent(name)}` }));
  }

  private handleOpenModeOptions(name: string): void {
    this.currentModeName = name;
    this.modalContent = html`
      <h2>Options for ${name}</h2>
      <button @click=${() => this.handleEdit(name)}>Edit</button>
      <button @click=${() => this.handleDelete(name)}>Delete</button>
    `;
    this.modal.open();
  }

  private handleDelete(name: string): void {
    this.modal.close();
    this.modalContent = html`
      <h2>Delete Custom Game Mode</h2>
      <p>Are you sure you want to delete "${name}"?</p>
      <button @click=${() => this.confirmDelete([name])}>Delete</button>
      <button @click=${() => this.modal.close()}>Cancel</button>
    `;
    this.modal.open();
  }

  private handleSelectAll = (): void => {
    if (this.selectAll) {
      this.selectedNames = [];
      this.selectAll = false;
    } else {
      this.selectedNames = this.customGameModesContext.modes.map((m) => m.name);
      this.selectAll = true;
    }
    this.selectedCount = this.selectedNames.length;
  };

  private handleDeleteSelected = (): void => {
    const selectedNames = [...this.selectedNames];
    if (selectedNames.length === 0) return;
    this.modalContent = html`
      <h2>Delete Selected Custom Game Modes</h2>
      <p>Are you sure you want to delete the following modes?</p>
      <ul>
        ${selectedNames.map(
          (name) => html`
            <li>${name}</li>
          `,
        )}
      </ul>
      <button @click=${() => this.confirmDelete(selectedNames)}>Delete All</button>
      <button @click=${() => this.modal.close()}>Cancel</button>
    `;
    this.modal.open();
  };

  private confirmDelete = (names: string[]): void => {
    this.modal.close();
    dispatch(this, DeleteCustomModesEvent(names));
    this.selectedNames = this.selectedNames.filter((n) => !names.includes(n));
    this.selectedCount = this.selectedNames.length;
    this.updateSelectAll();
  };

  private toggleSelection(name: string): void {
    if (this.selectedNames.includes(name)) {
      this.selectedNames = this.selectedNames.filter((n) => n !== name);
    } else {
      this.selectedNames = [...this.selectedNames, name];
    }
    this.selectedCount = this.selectedNames.length;
    this.updateSelectAll();
  }

  private updateSelectAll(): void {
    this.selectAll =
      this.customGameModesContext.modes.length > 0 &&
      this.customGameModesContext.modes.every((mode) => this.selectedNames.includes(mode.name));
  }

  private handleModalSubmit = (): void => {
    // Handle submit if needed
  };

  private handleDirectPlay(name: string): void {
    const randomGameId = "custom-" + Math.floor(Math.random() * 90000 + 10000);
    const randomPlayerId = crypto.randomUUID();
    dispatch(
      this,
      NavigationEvent({
        path: `/play/game/${randomGameId}/player/${randomPlayerId}?mode=${encodeURIComponent(name)}`,
      }),
    );
  }
}
