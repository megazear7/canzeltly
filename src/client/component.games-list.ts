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
import { GameStatus } from "../game/game.js";
import { NavigationEvent } from "./event.navigation.js";
import { LoadingStatus } from "../shared/type.loading.js";
import "./component.game-preview.js";

@customElement("canzeltly-games-list")
export class CanzeltlyGamesList extends LitElement {
  @consume({ context: gamesContext })
  @state()
  gamesContext!: GamesContext;

  @state()
  selectedIds: string[] = [];

  @state()
  selectAllActive: boolean = false;

  @state()
  selectAllCompleted: boolean = false;

  @state()
  selectedCount: number = 0;

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
      .games-list {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  override render(): TemplateResult {
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
      const activeGames = games.filter((game) => game.status !== GameStatus.enum.GameOver);
      const completedGames = games.filter((game) => game.status === GameStatus.enum.GameOver);

      content = html`
        ${activeGames.length > 0
          ? html`
              <h2>Active Games</h2>
              <label>
                <input type="checkbox" .checked=${this.selectAllActive} @change=${this.handleSelectAllActive} />
                Select All Active
              </label>
              <div class="games-list">
                ${activeGames.map(
                  (game) => html`
                    <canzeltly-game-preview
                      .gameState=${game}
                      .selected=${this.selectedIds.includes(game.id)}
                      .onToggleSelection=${(id: string) => this.toggleSelection(id)}
                      .onOpenGameOptions=${this.handleOpenGameOptions}></canzeltly-game-preview>
                  `,
                )}
              </div>
            `
          : ""}
        ${completedGames.length > 0
          ? html`
              <h2>Completed Games</h2>
              <label>
                <input type="checkbox" .checked=${this.selectAllCompleted} @change=${this.handleSelectAllCompleted} />
                Select All Completed
              </label>
              <div class="games-list">
                ${completedGames.map(
                  (game) => html`
                    <canzeltly-game-preview
                      .gameState=${game}
                      .selected=${this.selectedIds.includes(game.id)}
                      .onToggleSelection=${(id: string) => this.toggleSelection(id)}
                      .onOpenGameOptions=${this.handleOpenGameOptions}></canzeltly-game-preview>
                  `,
                )}
              </div>
            `
          : ""}
      `;
    }

    return html`
      <div class="header">
        <h1>Saved Games</h1>
        <button class="warning" ?disabled=${this.selectedCount === 0} @click=${this.handleDeleteSelected}>
          Delete (${this.selectedCount})
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
    this.addEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(ModelSubmitEventName.value, this.handleModalSubmit);
  }

  private handleOpenGameOptions(gameId: string): void {
    this.currentGameId = gameId;
    const game = this.gamesContext.games.find((g) => g.id === gameId);
    if (!game) return;

    const isCompleted = game.status === GameStatus.enum.GameOver;
    const playButtonText = isCompleted ? "View Summary" : "Play Game";

    this.modalContent = html`
      <h2>Options for ${game.name}</h2>
      <button @click=${() => this.handlePlayGame(gameId, isCompleted)}>${playButtonText}</button>
      <button @click=${() => this.handleDeleteGame(gameId)}>Delete Game</button>
      <button @click=${() => this.handleRenameGame(gameId)}>Rename Game</button>
    `;
    this.modal.open();
  }

  private handlePlayGame(gameId: string, isCompleted: boolean = false): void {
    this.modal.close();
    const game = this.gamesContext.games.find((g) => g.id === gameId);
    if (!game) return;

    if (isCompleted) {
      // For completed games, navigate to summary page
      const playerId = game.players[0]?.playerId || "unknown";
      dispatch(this, NavigationEvent({ path: `/summary/game/${gameId}/player/${playerId}` }));
    } else {
      // For active games, navigate to play page
      const playerId = game.players[0]?.playerId || "unknown";
      dispatch(this, NavigationEvent({ path: `/play/game/${gameId}/player/${playerId}` }));
    }
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

  private handleSelectAllActive = (): void => {
    const activeGames = this.gamesContext.games.filter((game) => game.status !== GameStatus.enum.GameOver);
    if (this.selectAllActive) {
      // Deselect all active
      this.selectedIds = this.selectedIds.filter((id) => !activeGames.some((g) => g.id === id));
      this.selectAllActive = false;
    } else {
      // Select all active
      const activeIds = activeGames.map((g) => g.id);
      this.selectedIds = [...new Set([...this.selectedIds, ...activeIds])];
      this.selectAllActive = true;
    }
    this.selectedCount = this.selectedIds.length;
  };

  private handleSelectAllCompleted = (): void => {
    const completedGames = this.gamesContext.games.filter((game) => game.status === GameStatus.enum.GameOver);
    if (this.selectAllCompleted) {
      // Deselect all completed
      this.selectedIds = this.selectedIds.filter((id) => !completedGames.some((g) => g.id === id));
      this.selectAllCompleted = false;
    } else {
      // Select all completed
      const completedIds = completedGames.map((g) => g.id);
      this.selectedIds = [...new Set([...this.selectedIds, ...completedIds])];
      this.selectAllCompleted = true;
    }
    this.selectedCount = this.selectedIds.length;
  };

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
    this.selectedIds = [];
    this.selectedCount = 0;
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
    this.selectedCount = this.selectedIds.length;
    this.updateSelectAllStates();
    this.requestUpdate();
  }

  private updateSelectAllStates(): void {
    const activeGames = this.gamesContext.games.filter((game) => game.status !== GameStatus.enum.GameOver);
    const completedGames = this.gamesContext.games.filter((game) => game.status === GameStatus.enum.GameOver);
    this.selectAllActive = activeGames.length > 0 && activeGames.every((game) => this.selectedIds.includes(game.id));
    this.selectAllCompleted =
      completedGames.length > 0 && completedGames.every((game) => this.selectedIds.includes(game.id));
  }
}
