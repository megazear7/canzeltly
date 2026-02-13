import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { CampaignsContext, campaignsContext, ProfileContext, profileContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAppProvider } from "./provider.app.js";
import { allCampaigns } from "../shared/data.campaigns.js";
import { getAllActiveCampaigns } from "./util.storage.js";

export abstract class CanzeltlyCampaignsProvider extends CanzeltlyAppProvider {
  @consume({ context: profileContext, subscribe: true })
  @property({ attribute: false })
  override profileContext!: ProfileContext;

  @provide({ context: campaignsContext })
  @property({ attribute: false })
  campaignsContext: CampaignsContext = {
    status: LoadingStatus.enum.idle,
    campaigns: [],
    activeCampaigns: [],
  };

  override async load(): Promise<void> {
    if (!this.profileContext.currentProfile) return;

    this.campaignsContext = {
      status: LoadingStatus.enum.loading,
      campaigns: [],
      activeCampaigns: [],
    };
    this.requestUpdate();

    this.campaignsContext = {
      status: LoadingStatus.enum.success,
      campaigns: allCampaigns,
      activeCampaigns: getAllActiveCampaigns(this.profileContext.currentProfile.id),
    };
    this.requestUpdate();
  }
}
