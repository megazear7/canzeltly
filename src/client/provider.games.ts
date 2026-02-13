import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { GamesContext, gamesContext, ProfileContext, profileContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { getAllGameStates } from "./util.storage.js";
import { DeleteGamesEventName } from "./event.delete-games.js";
import { RenameGameEventName } from "./event.rename-game.js";
import { deleteMultipleGameStates, renameGameState } from "./util.storage.js";

export abstract class CanzeltlyGamesProvider extends CanzeltlyAppProvider {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  override profileContext!: ProfileContext;

  @provide({ context: gamesContext })
  @property({ attribute: false })
  gamesContext: GamesContext = {
    status: LoadingStatus.enum.idle,
    games: [],
  };

  override async load(): Promise<void> {
    if (!this.profileContext.currentProfile) return;

    this.gamesContext.status = LoadingStatus.enum.loading;
    this.requestUpdate();
    try {
      this.gamesContext.games = getAllGameStates(this.profileContext.currentProfile.id);
      this.gamesContext.status = LoadingStatus.enum.success;
    } catch (error) {
      console.error("Failed to load saved games", error);
      this.gamesContext.status = LoadingStatus.enum.error;
    }
    this.requestUpdate();
  }

  override connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.addEventListener(DeleteGamesEventName.value, this.handleDeleteGames);
    this.addEventListener(RenameGameEventName.value, this.handleRenameGame);
    return this.load();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(DeleteGamesEventName.value, this.handleDeleteGames);
    this.removeEventListener(RenameGameEventName.value, this.handleRenameGame);
  }

  private handleDeleteGames = (event: Event): void => {
    if (!this.profileContext.currentProfile) return;

    const customEvent = event as CustomEvent;
    const ids = customEvent.detail.ids as string[];
    deleteMultipleGameStates(ids, this.profileContext.currentProfile.id);
    this.gamesContext.games = this.gamesContext.games.filter((g) => !ids.includes(g.id));
    this.requestUpdate();
  };

  private handleRenameGame = (event: Event): void => {
    if (!this.profileContext.currentProfile) return;

    const customEvent = event as CustomEvent;
    const { oldId, newName } = customEvent.detail;
    renameGameState(oldId, newName, this.profileContext.currentProfile.id);
    const game = this.gamesContext.games.find((g) => g.id === oldId);
    if (game) {
      game.name = newName;
      // id is updated in storage, but since we filter by id, need to reload or update
      this.load(); // reload to get updated ids
    }
  };
}
