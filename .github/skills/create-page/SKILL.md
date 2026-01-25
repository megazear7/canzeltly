---
name: create-page
description: How to create a new page in the Canzeltly application.
---

# Adding a New Page

This skill covers the process of adding a new page to the Canzeltly application. Pages in this application are built using Lit components that extend providers for context management.

## Overview

Pages are organized as follows:
- **Page Components**: Located in `src/client/page.<page-name>.ts`
- **Providers**: Located in `src/client/provider.<provider-name>.ts` (provide context to pages)
- **Routes**: Defined in `src/shared/service.client.ts` and `src/shared/type.routes.ts`
- **App Integration**: Handled in `src/client/app.ts`

## Step-by-Step Process

### 1. Create a Provider (if needed)

If your page needs specific context or data loading, create a provider that extends `CanzeltlyAbstractProvider` or `CanzeltlyAppProvider`.

**Example Provider** (`src/client/provider.my-page.ts`):
```typescript
import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { MyPageContext, myPageContext } from "./context.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js";

export abstract class CanzeltlyMyPageProvider extends CanzeltlyAbstractProvider {
  @provide({ context: myPageContext })
  @property({ attribute: false })
  myPageContext: MyPageContext = {
    data: null,
    status: 'idle',
  };

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.load();
  }

  async load(): Promise<void> {
    // Load your page-specific data here
    this.myPageContext = {
      data: await fetchMyData(),
      status: 'loaded',
    };
  }
}
```

### 2. Create the Page Component

Create a page component that extends your provider (or `CanzeltlyAppProvider` for basic pages).

**Example Page** (`src/client/page.my-page.ts`):
```typescript
import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";

@customElement("canzeltly-my-page")
export class CanzeltlyMyPage extends CanzeltlyAppProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        /* Your page styles */
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <h1>My New Page</h1>
        <p>Welcome to my page!</p>
      </main>
    `;
  }
}
```

For pages with route parameters, parse them in the constructor or a property:

```typescript
import { parseRouteParams } from "../shared/util.route-params.js";

@customElement("canzeltly-example-page")
export class CanzeltlyExamplePage extends CanzeltlyAppProvider {
  params = parseRouteParams("/example/:id", window.location.pathname);

  override render(): TemplateResult {
    return html`
      <main>
        <h1>Example: ${this.params.id}</h1>
      </main>
    `;
  }
}
```

### 3. Add Route Configuration

#### Update Route Names
Add your new route name to the `RouteName` enum in `src/shared/type.routes.ts`:

```typescript
export const RouteName = z.enum(["home", "example", "my_page", "not_found"]);
```

#### Add Route Config
Add your route to the `routes` array in `src/shared/service.client.ts`:

```typescript
export const routes = [
  {
    name: RouteName.enum.home,
    path: "/",
  },
  {
    name: RouteName.enum.example,
    path: "/example/:id",
  },
  {
    name: RouteName.enum.my_page,
    path: "/my-page",
  },
];
```

### 4. Integrate into App Component

#### Import the Page
Add the import to `src/client/app.ts`:

```typescript
import "./page.my-page.js";
```

#### Add Render Case
Add a case for your page in the `render()` method's switch statement:

```typescript
switch (this.currentRoute!.name) {
  case RouteName.enum.home:
    return html`
      <div class="app-bar"></div>
      <canzeltly-home-page></canzeltly-home-page>
    `;
  case RouteName.enum.example:
    return html`
      <div class="app-bar"></div>
      <canzeltly-example-page></canzeltly-example-page>
    `;
  case RouteName.enum.my_page:
    return html`
      <div class="app-bar"></div>
      <canzeltly-my-page></canzeltly-my-page>
    `;
  default:
    return html`
      <div class="app-bar"></div>
      <canzeltly-not-found-page></canzeltly-not-found-page>
    `;
}
```

## Best Practices

- **Minimal Logic**: Keep page components focused on rendering. Delegate complex logic to components.
- **Context Usage**: Use providers to manage page-specific state and data loading.
- **Styling**: Use CSS custom properties defined in `static/app.css` for consistent theming.
- **Navigation**: Use standard `<a>` tags for navigation - the app handles SPA routing automatically.
- **Route Parameters**: Use the `parseRouteParams` utility for dynamic routes with parameters.

## Example: Complete New Page

Following the steps above, here's what files you'd create/modify for a new "About" page:

1. **src/client/page.about.ts**:
```typescript
import { css, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "./styles.global.js";
import { CanzeltlyAppProvider } from "./provider.app.js";

@customElement("canzeltly-about-page")
export class CanzeltlyAboutPage extends CanzeltlyAppProvider {
  static override styles = [
    globalStyles,
    css`
      main {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--size-large);
      }
    `,
  ];

  override render(): TemplateResult {
    return html`
      <main>
        <h1>About Canzeltly</h1>
        <p>This is an example application built with the Zelt Stack.</p>
        <a href="/" class="standalone">← Back to Home</a>
      </main>
    `;
  }
}
```

2. **Update src/shared/type.routes.ts**:
```typescript
export const RouteName = z.enum(["home", "example", "about", "not_found"]);
```

3. **Update src/shared/service.client.ts**:
```typescript
export const routes = [
  // ... existing routes
  {
    name: RouteName.enum.about,
    path: "/about",
  },
];
```

4. **Update src/client/app.ts**:
```typescript
import "./page.about.js";

// In render method:
case RouteName.enum.about:
  return html`
    <div class="app-bar"></div>
    <canzeltly-about-page></canzeltly-about-page>
  `;
```

Now you can navigate to `/about` to see your new page!