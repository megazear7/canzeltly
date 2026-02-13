import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { CustomGameModesContext, customGameModesContext, ProfileContext, profileContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { getAllCustomGameModes, deleteMultipleCustomGameModes } from "./util.storage.js";
import { DeleteCustomModesEventName } from "./event.delete-custom-modes.js";

export abstract class CanzeltlyCustomGameModesProvider extends CanzeltlyAppProvider {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  override profileContext!: ProfileContext;

  @provide({ context: customGameModesContext })
  @property({ attribute: false })
  customGameModesContext: CustomGameModesContext = {
    status: LoadingStatus.enum.idle,
    modes: [],
  };

  override async load(): Promise<void> {
    if (!this.profileContext.currentProfile) return;

    this.customGameModesContext.status = LoadingStatus.enum.loading;
    this.requestUpdate();
    try {
      this.customGameModesContext.modes = getAllCustomGameModes(this.profileContext.currentProfile.id);
      this.customGameModesContext.status = LoadingStatus.enum.success;
    } catch (error) {
      console.error("Failed to load custom game modes", error);
      this.customGameModesContext.status = LoadingStatus.enum.error;
    }
    this.requestUpdate();
  }

  override connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.addEventListener(DeleteCustomModesEventName.value, this.handleDeleteCustomModes);
    return this.load();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(DeleteCustomModesEventName.value, this.handleDeleteCustomModes);
  }

  private handleDeleteCustomModes = (event: Event): void => {
    if (!this.profileContext.currentProfile) return;

    const customEvent = event as CustomEvent;
    const names = customEvent.detail.names as string[];
    deleteMultipleCustomGameModes(names, this.profileContext.currentProfile.id);
    this.customGameModesContext.modes = this.customGameModesContext.modes.filter((m) => !names.includes(m.name));
    this.requestUpdate();
  };
}
