import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCampaignsProvider } from "./provider.campaigns.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { HeroStats } from "../shared/type.campaign.js";
import { saveActiveCampaign } from "./util.storage.js";

@customElement("canzeltly-start-campaign-page")
export class CanzeltlyStartCampaignPage extends CanzeltlyCampaignsProvider {
  preselectedCampaign = new URLSearchParams(window.location.search).get("campaign") || "";

  static override styles = [
    globalStyles,
    css`
      main {
        max-width: var(--size-800);
        margin: 0 auto;
        padding: var(--size-large);
      }

      .campaign-card {
        background: var(--color-secondary-surface);
        border-radius: var(--border-radius-large);
        padding: var(--size-large);
        margin-bottom: var(--size-large);
        box-shadow: var(--shadow-normal);
      }

      .campaign-card h2 {
        margin-top: 0;
      }

      .campaign-card p {
        color: var(--color-secondary-text-muted);
      }

      .campaign-actions {
        display: flex;
        gap: var(--size-medium);
        margin-top: var(--size-medium);
      }
    `,
  ];

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    if (this.preselectedCampaign) {
      this.startCampaign(this.preselectedCampaign);
    }
  }

  override render(): TemplateResult {
    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>Start New Campaign</h1>
        <p>
          Are you looking to continue an existing campaign? Then go to the
          <a
            href="/campaigns/continue"
            @click=${(e: Event) => {
              e.preventDefault();
              this.goContinueCampaign();
            }}>
            continue campaign page
          </a>
          .
        </p>
        <p>Choose a campaign to begin your adventure.</p>
        ${this.campaignsContext.campaigns.map(
          (campaign) => html`
            <div class="campaign-card">
              <h2>${campaign.name}</h2>
              <p>${campaign.description}</p>
              <p>${campaign.games.length} games</p>
              <div class="campaign-actions">
                <button class="primary" @click=${() => this.startCampaign(campaign.slug)}>Begin Campaign</button>
              </div>
            </div>
          `,
        )}
      </main>
    `;
  }

  private startCampaign(slug: string): void {
    const instance = {
      id: crypto.randomUUID(),
      campaignSlug: slug,
      currentGameIndex: 0,
      completedGameIndexes: [],
      heroStats: HeroStats.parse({}),
      startedAt: Date.now(),
    };
    saveActiveCampaign(instance, this.profileContext.currentProfile!.id);
    dispatch(this, NavigationEvent({ path: `/campaigns/${instance.id}` }));
  }

  private goContinueCampaign(): void {
    dispatch(this, NavigationEvent({ path: "/campaigns/continue" }));
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
