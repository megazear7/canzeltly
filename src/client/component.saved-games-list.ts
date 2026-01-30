import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { consume } from "@lit/context";
import { globalStyles } from "./styles.global.js";
import { GamesContext, gamesContext } from "./context.js";
import { CanzeltlyModal } from "./component.modal.js";
import { ModelSubmitEventName } from "./event.modal-submit.js";
import { DeleteGamesEvent } from "./event.delete-games.js";
import { RenameGameEvent } from "./event.rename-game.js";
import { dispatch } from "./util.events.js";
import { NavigationEvent } from "./event.navigation.js";
import { LoadingStatus } from "../shared/type.loading.js";
import "./component.game-preview.js";

@customElement("canzeltly-saved-games-list")
export class CanzeltlySavedGamesList extends LitElement {
  @consume({ context: gamesContext })
  @state()
  gamesContext!: GamesContext;

  @state()
  selectedIds: string[] = [];

  @state()
  modalContent: TemplateResult | null = null;

  @state()
  currentGameId: string | null = null;

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
      .delete-button {
        background: var(--color-error);
        color: white;
        border: none;
        padding: var(--size-medium);
        border-radius: var(--radius-small);
        cursor: pointer;
      }
      .delete-button:disabled {
        background: var(--color-disabled);
        cursor: not-allowed;
      }
      .games-list {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  override render(): TemplateResult {
    const selectedCount = this.selectedIds.length;
    const { status, games } = this.gamesContext;

    let content: TemplateResult;
    if (status === LoadingStatus.enum.loading) {
      content = html`
        <p>Loading saved games...</p>
      `;
    } else if (status === LoadingStatus.enum.error) {
      content = html`
        <p>Error loading saved games.</p>
      `;
    } else if (games.length === 0) {
      content = html`
        <p>No saved games found.</p>
      `;
    } else {
      content = html`
        <div class="games-list">
          ${games.map(
            (game) => html`
              <canzeltly-game-preview
                .gameState=${game}
                .selected=${this.selectedIds.includes(game.id)}
                @toggle-selection=${this.handleToggleSelection}
                @open-game-options=${this.handleOpenGameOptions}></canzeltly-game-preview>
            `,
          )}
        </div>
      `;
    }

    return html`
      <div class="header">
        <h1>Saved Games</h1>
        <button class="delete-button" ?disabled=${selectedCount === 0} @click=${this.handleDeleteSelected}>
          Delete (${selectedCount})
        </button>
      </div>
      ${content}
      <canzeltly-modal>
        <div slot="body">${this.modalContent}</div>
      </canzeltly-modal>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("toggle-selection", this.handleToggleSelection);
    this.addEventListener("open-game-options", this.handleOpenGameOptions);
    this.addEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("toggle-selection", this.handleToggleSelection);
    this.removeEventListener("open-game-options", this.handleOpenGameOptions);
    this.removeEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  private handleToggleSelection = (event: Event): void => {
    const customEvent = event as CustomEvent;
    const { id } = customEvent.detail;
    this.toggleSelection(id);
  };

  private handleOpenGameOptions = (event: Event): void => {
    const customEvent = event as CustomEvent;
    const { gameId } = customEvent.detail;
    this.currentGameId = gameId;
    const game = this.gamesContext.games.find((g) => g.id === gameId);
    if (!game) return;
    this.modalContent = html`
      <h2>Options for ${game.name}</h2>
      <button @click=${() => this.handlePlayGame(gameId)}>Play Game</button>
      <button @click=${() => this.handleDeleteGame(gameId)}>Delete Game</button>
      <button @click=${() => this.handleRenameGame(gameId)}>Rename Game</button>
    `;
    this.modal.open();
  };

  private handlePlayGame(gameId: string): void {
    this.modal.close();
    dispatch(this, NavigationEvent({ path: `/play/${gameId}` }));
  }

  private handleDeleteGame(gameId: string): void {
    this.modal.close();
    dispatch(this, DeleteGamesEvent([gameId]));
  }

  private handleRenameGame(gameId: string): void {
    const game = this.gamesContext.games.find((g) => g.id === gameId);
    if (!game) return;
    this.modalContent = html`
      <h2>Rename Game</h2>
      <input type="text" .value=${game.name} id="rename-input" />
      <button @click=${this.submitRename}>Rename</button>
    `;
    // Don't close modal, just change content
  }

  private handleDeleteSelected = (): void => {
    const selectedIds = this.selectedIds;
    if (selectedIds.length === 0) return;
    const selectedGames = this.gamesContext.games.filter((g) => selectedIds.includes(g.id));
    this.modalContent = html`
      <h2>Delete Selected Games</h2>
      <p>Are you sure you want to delete the following games?</p>
      <ul>
        ${selectedGames.map(
          (game) => html`
            <li>${game.name}</li>
          `,
        )}
      </ul>
      <button @click=${this.submitDeleteSelected}>Delete All</button>
      <button @click=${() => this.modal.close()}>Cancel</button>
    `;
    this.modal.open();
  };

  private submitDeleteSelected = (): void => {
    const selectedIds = [...this.selectedIds];
    this.modal.close();
    dispatch(this, DeleteGamesEvent(selectedIds));
  };

  private submitRename = (): void => {
    const input = this.shadowRoot?.getElementById("rename-input") as HTMLInputElement;
    if (!input || !this.currentGameId) return;
    const newName = input.value.trim();
    if (!newName) return;
    this.modal.close();
    dispatch(this, RenameGameEvent(this.currentGameId, newName));
  };

  private handleModalSubmit = (): void => {
    // Handle submit if needed
  };

  private toggleSelection(id: string): void {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      this.selectedIds = [...this.selectedIds, id];
    }
    this.requestUpdate();
  }
}
