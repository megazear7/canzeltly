import { css, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyCampaignsProvider } from "./provider.campaigns.js";
import { NavigationEvent } from "./event.navigation.js";
import { dispatch } from "./util.events.js";
import { getCampaignBySlug } from "../shared/data.campaigns.js";
import { kebabIcon } from "./icons.js";
import { deleteCampaignInstance } from "./util.storage.js";

@customElement("canzeltly-continue-campaign-page")
export class CanzeltlyContinueCampaignPage extends CanzeltlyCampaignsProvider {
  @state()
  private deleteModalInstanceId: string | null = null;
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
        cursor: pointer;
        transition: var(--transition-all);
        position: relative;
      }

      .campaign-card:hover {
        box-shadow: var(--shadow-hover);
      }

      .campaign-card h2 {
        margin-top: 0;
      }

      .kebab-menu {
        position: absolute;
        top: var(--size-medium);
        right: var(--size-medium);
        background: none;
        border: none;
        color: var(--color-secondary-text-muted);
        cursor: pointer;
        padding: var(--size-small);
        border-radius: var(--border-radius-small);
        transition: var(--transition-all);
      }

      .kebab-menu:hover {
        background: var(--color-secondary-surface-hover);
        color: var(--color-primary-text);
      }

      .progress {
        color: var(--color-secondary-text-muted);
        font-size: var(--font-small);
      }

      .no-campaigns {
        text-align: center;
        padding: var(--size-xl);
        color: var(--color-secondary-text-muted);
      }
    `,
  ];

  override render(): TemplateResult {
    const activeCampaigns = this.campaignsContext.activeCampaigns;

    return html`
      <main>
        <button class="back-button" @click=${this.goHome}>Home</button>
        <h1>Continue Campaign</h1>
        ${activeCampaigns.length === 0
          ? html`
              <div class="no-campaigns">
                <p>No active campaigns. Start a new campaign to begin your adventure!</p>
                <button class="primary" @click=${this.goStartCampaign}>Start New Campaign</button>
              </div>
            `
          : activeCampaigns.map((instance) => {
              const campaign = getCampaignBySlug(instance.campaignSlug);
              if (!campaign) return html``;
              const progress = instance.completedGameIndexes.length;
              const total = campaign.games.length;
              return html`
                <div class="campaign-card">
                  <button
                    class="kebab-menu"
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.openDeleteModal(instance.id);
                    }}>
                    ${kebabIcon}
                  </button>
                  <div class="campaign-info" @click=${() => this.openCampaign(instance.id)}>
                    <h2>${campaign.name}</h2>
                    <p>${campaign.description}</p>
                    <p class="progress">Progress: ${progress} / ${total} games completed</p>
                  </div>
                </div>
              `;
            })}
      </main>

      <canzeltly-modal
        .visible=${this.deleteModalInstanceId !== null}
        @modal-submit=${this.confirmDelete}
        @modal-closing=${this.closeDeleteModal}>
        <div slot="body">
          <h3>Delete Campaign</h3>
          <p>Are you sure you want to delete this campaign instance? This action cannot be undone.</p>
          <div
            style="display: flex; gap: var(--size-medium); justify-content: flex-end; margin-top: var(--size-large);">
            <button @click=${this.closeDeleteModal}>Cancel</button>
            <button class="danger" @click=${this.confirmDelete}>
              <div style="display: flex; flex-direction: column; align-items: center; gap: var(--size-small);">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M3 6h18v2H3V6zm0 3h18v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9zm5 2v8h2v-8H8zm4 0v8h2v-8h-2z" />
                </svg>
                Delete
              </div>
            </button>
          </div>
        </div>
      </canzeltly-modal>
    `;
  }

  private openCampaign(instanceId: string): void {
    dispatch(this, NavigationEvent({ path: `/campaigns/${instanceId}` }));
  }

  private openDeleteModal(instanceId: string): void {
    this.deleteModalInstanceId = instanceId;
  }

  private closeDeleteModal(): void {
    this.deleteModalInstanceId = null;
  }

  private confirmDelete(): void {
    if (this.deleteModalInstanceId) {
      deleteCampaignInstance(this.deleteModalInstanceId);
      this.load();
      this.deleteModalInstanceId = null;
    }
  }

  private goStartCampaign(): void {
    dispatch(this, NavigationEvent({ path: "/campaigns/start" }));
  }

  private goHome(): void {
    dispatch(this, NavigationEvent({ path: "/" }));
  }
}
