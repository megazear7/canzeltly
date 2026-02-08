import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { RouteConfig, RouteName } from "../shared/type.routes.js";
import { parseRouteParams } from "../shared/util.route-params.js";
import { routes } from "./app.routes.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js";
import { CanzeltlyToast } from "./component.toast.js";
import { CanzeltlySaveIndicator } from "./component.save-indicator.js";
import { SaveEventName } from "./event.save.js";
import { NavigationEventName } from "./event.navigation.js";
import { SuccessEventName } from "./event.success.js";
import { WarningEventName } from "./event.warning.js";
import "./page.home.js";
import "./page.play.js";
import "./page.not-found.js";
import "./page.create-game.js";
import "./page.saved-games.js";
import "./page.game-summary.js";
import "./component.toast.js";
import "./component.save-indicator.js";
import "./component.play.js";

@customElement("canzeltly-app")
export class CanzeltlyApp extends LitElement {
  static override styles = [];
  routes: RouteConfig[] = routes;

  @property({ type: String })
  currentRoute: RouteConfig | null = this.determineRouteName();

  @property({ type: String }) toastMessage = "";
  @property({ type: String }) toastType: "error" | "warning" | "success" | "info" = "info";
  @property({ type: Boolean }) toastVisible = false;
  @query("canzeltly-toast") toast!: CanzeltlyToast;
  @query("canzeltly-save-indicator") saveIndicator!: CanzeltlySaveIndicator;

  private boundHandlePopState: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("click", this.navigate.bind(this));
    document.addEventListener(WarningEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      this.toast.show(customEvent.detail.message, "warning");
    });
    document.addEventListener(SuccessEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      this.toast.show(customEvent.detail.message, "success");
    });
    document.addEventListener(NavigationEventName.value, (event: Event) => {
      const customEvent = event as CustomEvent;
      window.history.pushState({}, "", customEvent.detail.path);
      this.currentRoute = this.determineRouteName();
      this.requestUpdate();
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
      <canzeltly-toast
        .message="${this.toastMessage}"
        .type="${this.toastType}"
        .visible="${this.toastVisible}"
        @close=${this.handleToastClose}></canzeltly-toast>
      <canzeltly-save-indicator></canzeltly-save-indicator>
      <canzeltly-notification-manager></canzeltly-notification-manager>
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
