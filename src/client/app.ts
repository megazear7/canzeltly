import { html, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { RouteConfig, RouteName } from "../shared/type.routes.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { routes } from "./app.routes.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js";
import { CanzeltlyProfileProvider } from "./provider.profile.js";
import { CanzeltlyToast } from "./component.toast.js";
import { ToastType } from "./component.toast.js";
import { CanzeltlySaveIndicator } from "./component.save-indicator.js";
import { CanzeltlyProfileModal } from "./component.profile-modal.js";
import { CanzeltlyCreateProfileModal } from "./component.create-profile-modal.js";
import { SaveEventName } from "./event.save.js";
import { NavigationEventName } from "./event.navigation.js";
import { SuccessEventName } from "./event.success.js";
import { WarningEventName } from "./event.warning.js";
import { BadgeUnlockedEventName } from "./event.badge-unlocked.js";
import "./page.home.js";
import "./page.play.js";
import "./page.not-found.js";
import "./page.create-game.js";
import "./page.saved-games.js";
import "./page.game-summary.js";
import "./page.custom-game-modes.js";
import "./page.start-campaign.js";
import "./page.continue-campaign.js";
import "./page.campaign-games.js";
import "./page.campaign-upgrade.js";
import "./page.achievements.js";
import "./component.toast.js";
import "./component.save-indicator.js";
import "./component.play.js";
import "./component.profile-modal.js";
import "./component.create-profile-modal.js";
import "./component.profile-circle.js";

@customElement("canzeltly-app")
export class CanzeltlyApp extends CanzeltlyProfileProvider {
  static override styles = [];
  routes: RouteConfig[] = routes;

  @property({ type: String })
  currentRoute: RouteConfig | null = this.determineRouteName();

  @property({ type: String }) toastMessage = "";
  @property({ type: String }) toastType: ToastType = ToastType.enum.info;
  @property({ type: Boolean }) toastVisible = false;
  @query("canzeltly-toast") toast!: CanzeltlyToast;
  @query("canzeltly-save-indicator") saveIndicator!: CanzeltlySaveIndicator;
  @query("canzeltly-profile-modal") profileModal!: CanzeltlyProfileModal;
  @query("canzeltly-create-profile-modal") createProfileModal!: CanzeltlyCreateProfileModal;

  private boundHandlePopState: (() => void) | null = null;

  override async connectedCallback(): Promise<void> {
    await super.connectedCallback();
    document.addEventListener("click", this.navigate.bind(this));
    document.addEventListener(WarningEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      this.toast.show(customEvent.detail.message, ToastType.enum.warning);
    });
    document.addEventListener(SuccessEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      this.toast.show(customEvent.detail.message, ToastType.enum.success);
    });
    document.addEventListener(BadgeUnlockedEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      this.toast.show(`Badge unlocked: ${customEvent.detail.badgeId}`, ToastType.enum.success);
    });
    document.addEventListener(NavigationEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      window.history.pushState({}, "", customEvent.detail.path);
      this.currentRoute = this.determineRouteName();
      this.requestUpdate();
    });

    // Profile event listeners
    document.addEventListener("show-profile-modal", () => this.showProfileModal());
    document.addEventListener("hide-profile-modal", () => this.hideProfileModal());
    document.addEventListener("show-create-profile-modal", () => this.showCreateProfileModal());
    document.addEventListener("hide-create-profile-modal", () => this.hideCreateProfileModal());
    document.addEventListener("create-profile", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.createProfile(customEvent.detail.name);
    });
    document.addEventListener("switch-profile", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.switchProfile(customEvent.detail.profileId);
    });
    document.addEventListener("delete-profile", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.deleteProfile(customEvent.detail.profileId);
    });
    document.addEventListener("update-profile-draw-mode", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.updateProfileDrawMode(customEvent.detail.drawMode);
    });

    this.addEventListener(SaveEventName.value, this.handleSaveEvent);

    this.boundHandlePopState = this.handlePopState.bind(this);
    window.addEventListener("popstate", this.boundHandlePopState);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(SaveEventName.value, this.handleSaveEvent);

    if (this.boundHandlePopState) {
      window.removeEventListener("popstate", this.boundHandlePopState);
    }
  }

  override render(): TemplateResult {
    const pageContent = this.currentRoute
      ? ((): TemplateResult => {
          switch (this.currentRoute!.name) {
            case RouteName.enum.home:
              return html`
                <canzeltly-home-page></canzeltly-home-page>
              `;
            case RouteName.enum.play:
              return html`
                <canzeltly-play-page></canzeltly-play-page>
              `;
            case RouteName.enum.create_game:
              return html`
                <canzeltly-create-game-page></canzeltly-create-game-page>
              `;
            case RouteName.enum.saved_games:
              return html`
                <canzeltly-saved-games-page></canzeltly-saved-games-page>
              `;
            case RouteName.enum.game_summary:
              return html`
                <canzeltly-game-summary-page></canzeltly-game-summary-page>
              `;
            case RouteName.enum.custom_game_modes:
              return html`
                <canzeltly-custom-game-modes-page></canzeltly-custom-game-modes-page>
              `;
            case RouteName.enum.start_campaign:
              return html`
                <canzeltly-start-campaign-page></canzeltly-start-campaign-page>
              `;
            case RouteName.enum.continue_campaign:
              return html`
                <canzeltly-continue-campaign-page></canzeltly-continue-campaign-page>
              `;
            case RouteName.enum.campaign_games:
              return html`
                <canzeltly-campaign-games-page></canzeltly-campaign-games-page>
              `;
            case RouteName.enum.campaign_upgrade:
              return html`
                <canzeltly-campaign-upgrade-page></canzeltly-campaign-upgrade-page>
              `;
            case RouteName.enum.achievements:
              return html`
                <canzeltly-achievements-page></canzeltly-achievements-page>
              `;
            default:
              return html`
                <canzeltly-not-found-page></canzeltly-not-found-page>
              `;
          }
        })()
      : html`
          <canzeltly-not-found-page></canzeltly-not-found-page>
        `;

    return html`
      ${pageContent}
      <canzeltly-profile-circle></canzeltly-profile-circle>
      <canzeltly-toast
        .message="${this.toastMessage}"
        .type="${this.toastType}"
        .visible="${this.toastVisible}"
        @close=${this.handleToastClose}></canzeltly-toast>
      <canzeltly-save-indicator></canzeltly-save-indicator>
      <canzeltly-notification-manager></canzeltly-notification-manager>
      ${this.profileContext.showProfileModal
        ? html`
            <canzeltly-profile-modal></canzeltly-profile-modal>
          `
        : ""}
      ${this.profileContext.showCreateProfileModal
        ? html`
            <canzeltly-create-profile-modal></canzeltly-create-profile-modal>
          `
        : ""}
    `;
  }

  determineRouteName(): RouteConfig | null {
    const pathname = window.location.pathname;

    for (const route of this.routes) {
      try {
        const params = parseRouteParams(route.path, pathname);
        if (params !== null) {
          return route;
        }
      } catch {
        // Ignore parsing errors and continue to next route
      }
    }

    return null;
  }

  async navigate(event: Event): Promise<void> {
    let target: HTMLAnchorElement | null = null;
    for (const el of event.composedPath()) {
      if (el instanceof HTMLElement && el.tagName === "A") {
        target = el as HTMLAnchorElement;
        break;
      }
    }

    if (
      target &&
      target.href &&
      !target.hasAttribute("download") &&
      target.target !== "_blank" &&
      target.origin === window.location.origin
    ) {
      event.preventDefault();
      sessionStorage.setItem("previousUrl", "");
      const url = new URL(target.href);
      const path = url.pathname + url.search;
      window.history.pushState({}, "", path);
      this.currentRoute = this.determineRouteName();
      this.requestUpdate();
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (this.currentRoute != null && changedProperties.has("currentRoute")) {
      const tagName = `canzeltly-${this.currentRoute.name.replace(/_/g, "-")}-page`;
      const pageElement = this.shadowRoot?.querySelector(tagName);
      const provider = pageElement as CanzeltlyAbstractProvider;
      provider.load().then(() => provider.requestUpdate());
    }
  }

  private handleToastClose(): void {
    this.toastVisible = false;
    this.requestUpdate();
  }

  private handleSaveEvent(): void {
    this.saveIndicator.show();
  }

  private handlePopState(): void {
    this.currentRoute = this.determineRouteName();
    this.requestUpdate();
  }
}
